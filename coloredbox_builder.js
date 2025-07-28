(function () {

  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host{ display:block; font-family:Arial, Helvetica, sans-serif; color:#1a1a1a; }
      .card{ border:1px solid #dde3ea; border-radius:6px; padding:12px; background:#fafbfc; }
      .row{ display:flex; gap:8px; align-items:center; margin-bottom:8px; flex-wrap:wrap; }
      label{ font-weight:600; }
      input[type="text"]{ flex:1 1 240px; padding:6px 8px; border:1px solid #cfd7df; border-radius:4px; }
      textarea{ width:100%; min-height:160px; resize:vertical; padding:8px; border:1px solid #cfd7df; border-radius:4px; font-family:Consolas, monospace; }
      button{ padding:8px 12px; border:0; border-radius:4px; cursor:pointer; background:#0060a8; color:#fff; font-weight:600; }
      button:disabled{ opacity:.5; cursor:not-allowed; }
      .hint{ color:#667; font-size:12px; }
      .ok{ color:#0a8a4b; font-size:12px; }
      .warn{ color:#b60c0c; font-size:12px; }
    </style>

    <div class="card">
      <div class="row">
        <label for="fn">File name</label>
        <input id="fn" type="text" placeholder="export" />
        <span class="hint" id="tsHint"></span>
      </div>
      <div class="row">
        <label>Payload (JSON array or XML)</label>
        <textarea id="payload" placeholder='[{"colA":1,"colB":"x"},{"colA":2,"colB":"y"}] or <rows><row>...</row></rows>'></textarea>
      </div>
      <div class="row">
        <button id="go">Export to XML</button>
        <span id="msg" class="hint"></span>
      </div>
    </div>
  `;

  class ExportXmlStory extends HTMLElement {

    constructor() {
      super();
      this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));

      // UI
      this._fnInput  = this.shadowRoot.getElementById("fn");
      this._payloadTA= this.shadowRoot.getElementById("payload");
      this._goBtn    = this.shadowRoot.getElementById("go");
      this._msg      = this.shadowRoot.getElementById("msg");
      this._tsHint   = this.shadowRoot.getElementById("tsHint");

      // Props (manifest)
      this.fileNamePrefix = "export";
      this.addTimestamp   = true;
      this._payloadProp   = "";   // valor recibido por método setPayload()
      this._nonce         = "";   // trigger

      this._wire();
      this._render();
    }

    /* ========= Wiring UI ========= */
    _wire(){
      this._fnInput.addEventListener("input", () => {
        this.fileNamePrefix = this._fnInput.value || "export";
        this._render();
      });
      this._goBtn.addEventListener("click", () => {
        // Story: botón interno exporta SIEMPRE
        this._exportNow(this._currentPayload());
      });
    }

    _render(){
      this._fnInput.value = this.fileNamePrefix || "export";
      this._tsHint.textContent = this.addTimestamp ? "(timestamp will be appended)" : "";
    }

    /* ========= SAC → cambios de propiedades ========= */
    onCustomWidgetAfterUpdate(changedProps){
      if (!changedProps) return;
      if (Object.prototype.hasOwnProperty.call(changedProps, "fileNamePrefix"))
        this.fileNamePrefix = changedProps.fileNamePrefix || "export";

      if (Object.prototype.hasOwnProperty.call(changedProps, "addTimestamp"))
        this.addTimestamp = !!changedProps.addTimestamp;

      if (Object.prototype.hasOwnProperty.call(changedProps, "payload")) {
        // desde App: setPayload(value)
        this._payloadProp = (changedProps.payload == null ? "" : String(changedProps.payload));
        // reflejamos en la TextArea para transparencia (opcional)
        this._payloadTA.value = this._payloadProp;
      }

      if (Object.prototype.hasOwnProperty.call(changedProps, "nonce")) {
        // desde App: fire(value) → SIEMPRE exporta con el payload actual
        this._nonce = String(changedProps.nonce || "");
        this._exportNow(this._currentPayload());
      }

      this._render();
    }

    /* ========= Helpers ========= */
    _nowStamp(){
      const d = new Date(), p = n => String(n).padStart(2,"0");
      return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}_`+
             `${p(d.getHours())}-${p(d.getMinutes())}-${p(d.getSeconds())}`;
    }

    _currentFileName(){
      const base = (this.fileNamePrefix && this.fileNamePrefix.trim()) ? this.fileNamePrefix.trim() : "export";
      return this.addTimestamp ? `${base}_${this._nowStamp()}` : base;
    }

    _currentPayload(){
      // Prioridad: si nos pasaron payload por método, úsalo;
      // si no, toma el del TextArea (Story).
      const p = (this._payloadProp && this._payloadProp.trim()) ? this._payloadProp : this._payloadTA.value;
      return (p || "").trim();
    }

    _exportNow(text){
      try{
        const content = String(text || "");
        if (!content){
          this._setMsg("Please enter JSON or XML in the payload box (or call setPayload).", "warn");
          return;
        }
        const xml = this._ensureXml(content);
        const name = this._currentFileName();

        // 1) Camino SAC (SAPUI5)
        try {
          if (window.sap && sap.ui && sap.ui.core && sap.ui.core.util && sap.ui.core.util.File) {
            sap.ui.core.util.File.save(xml, name, "xml", "application/xml", "utf-8");
            this._setMsg(`Exported as ${name}.xml`, "ok");
            this.dispatchEvent(new CustomEvent("onExported"));
            return;
          }
        } catch (e) { /* fallback */ }

        // 2) Fallback navegador
        const blob = new Blob([xml], { type: "application/xml;charset=utf-8;" });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement("a");
        a.href = url; a.download = name + ".xml";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this._setMsg(`Exported as ${name}.xml (fallback)`, "ok");
        this.dispatchEvent(new CustomEvent("onExported"));

      } catch(err){
        this._setMsg(`Error: ${err && err.message ? err.message : String(err)}`, "warn");
      }
    }

    _ensureXml(text){
      const str = String(text || "");
      // JSON array? → XML tabular
      try {
        const data = JSON.parse(str);
        if (Array.isArray(data)) return this._jsonArrayToXml(data);
      } catch(e){ /* not JSON */ }
      // Añade cabecera si falta
      if (!str.trim().startsWith("<?xml")) {
        return '<?xml version="1.0" encoding="UTF-8"?>\n' + str;
      }
      return str;
    }

    _jsonArrayToXml(arr){
      const out = ['<?xml version="1.0" encoding="UTF-8"?>','<rows>'];
      for (const row of arr){
        out.push('  <row>');
        for (const k in row){
          if (Object.prototype.hasOwnProperty.call(row, k)) {
            out.push(`    <${k}>${this._esc(row[k])}</${k}>`);
          }
        }
        out.push('  </row>');
      }
      out.push('</rows>');
      return out.join('\n');
    }

    _esc(v){
      return (v==null?'':String(v))
        .replace(/&/g,'&amp;').replace(/</g,'&lt;')
        .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
    }

    _setMsg(text, cls){
      this._msg.textContent = text || "";
      this._msg.className = cls ? cls : "hint";
    }
  }

  // Tag EXACTO al del manifest
  customElements.define("com-oscar-exportxmlstory", ExportXmlStory);

})();
