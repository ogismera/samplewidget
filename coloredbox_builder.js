(function () {

  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host{ display:block; font-family:Segoe UI, Roboto, Arial, sans-serif; }
      .card{
        border:1px solid #dcdfe4; border-radius:6px; padding:10px; background:#fafbfc;
      }
      .row{ display:flex; gap:8px; align-items:center; margin-bottom:8px; flex-wrap:wrap; }
      label{ font-size:12px; color:#333; }
      input[type="text"]{ padding:6px 8px; border:1px solid #c5ccd3; border-radius:4px; min-width:220px; }
      textarea{
        width:100%; height:140px; padding:8px; box-sizing:border-box;
        border:1px solid #c5ccd3; border-radius:4px; font-family:Consolas,monospace; font-size:12px;
        background:#fff;
      }
      button{
        border:0; border-radius:4px; padding:8px 12px; cursor:pointer;
        background:#0063b1; color:#fff; font-weight:600;
      }
      button:active{ transform: translateY(1px); }
      .hint{ font-size:12px; color:#666; }
    </style>

    <div class="card">
      <div class="row">
        <label for="fn">File name</label>
        <input id="fn" type="text" placeholder="export"/>
        <label><input id="ts" type="checkbox" checked/> Append timestamp</label>
        <button id="go">Export XML</button>
      </div>
      <div class="row" style="flex-direction:column; align-items:stretch;">
        <label>Paste JSON array or XML (optional)</label>
        <textarea id="ta" placeholder='[{"col1":1,"col2":"A"},{"col1":2,"col2":"B"}] or <root>...</root>'></textarea>
        <div class="hint">Si dejas vacío el área, usaremos la propiedad "payload" del widget.</div>
      </div>
    </div>
  `;

  class ExportXmlStory extends HTMLElement {

    constructor() {
      super();
      this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));

      // UI refs
      this.$fn = this.shadowRoot.getElementById("fn");
      this.$ts = this.shadowRoot.getElementById("ts");
      this.$ta = this.shadowRoot.getElementById("ta");
      this.$go = this.shadowRoot.getElementById("go");

      // properties (las conoce el manifest)
      this.fileName = "export";
      this.appendTimestamp = true;
      this.payload = "";

      // eventos
      this.$go.addEventListener("click", () => this._onExportClick());
    }

    /* === Hooks del runtime de SAC === */

    onCustomWidgetAfterUpdate(changedProps) {

      debbuger;
      if (!changedProps) return;

      if (Object.prototype.hasOwnProperty.call(changedProps, "fileName")) {
        this.fileName = changedProps.fileName || "export";
        this.$fn.value = this.fileName;
      }
      if (Object.prototype.hasOwnProperty.call(changedProps, "appendTimestamp")) {
        this.appendTimestamp = !!changedProps.appendTimestamp;
        this.$ts.checked = this.appendTimestamp;
      }
      if (Object.prototype.hasOwnProperty.call(changedProps, "payload")) {
        this.payload = (typeof changedProps.payload === "string") ? changedProps.payload : String(changedProps.payload || "");
        // No sobreescribimos el textarea si el usuario ya escribió algo
        if (!this.$ta.value) this.$ta.value = this.payload;
      }
    }

    /* === Lógica de exportación === */

    _onExportClick() {
      // 1) nombre de archivo
      const base = (this.$fn.value || this.fileName || "export").trim();
      const name = this.appendTimestamp || this.$ts.checked
        ? `${base}_${this._nowStamp()}`
        : base;

      // 2) contenido (prioridad al textarea si tiene algo)
      const text = (this.$ta.value && this.$ta.value.trim())
        ? this.$ta.value
        : (this.payload || "");

      // 3) exportar
      const xml = this._ensureXml(text);
      this._saveXml(xml, name);
      this.dispatchEvent(new CustomEvent("onExported"));
    }

    _nowStamp(){
      const d = new Date();
      const p = n => String(n).padStart(2,"0");
      return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}_${p(d.getHours())}-${p(d.getMinutes())}-${p(d.getSeconds())}`;
    }

    _ensureXml(text) {
      const strIn = (typeof text === "string") ? text : String(text || "");
      // ¿JSON array? → convertir a XML sencillo
      try {
        const arr = JSON.parse(strIn);
        if (Array.isArray(arr)) {
          return this._jsonArrayToXml(arr);
        }
      } catch(e) { /* no es JSON */ }

      // Texto: si no tiene cabecera XML, añadirla
      let out = strIn;
      if (!out.trim().startsWith("<?xml")) {
        out = '<?xml version="1.0" encoding="UTF-8"?>\n' + out;
      }
      return out;
    }

    _jsonArrayToXml(arr) {
      const lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rows>'
      ];
      for (const row of arr) {
        lines.push('  <row>');
        for (const k in row) {
          if (Object.prototype.hasOwnProperty.call(row, k)) {
            lines.push(`    <${k}>${this._esc(row[k])}</${k}>`);
          }
        }
        lines.push('  </row>');
      }
      lines.push('</rows>');
      return lines.join('\n');
    }

    _esc(v) {
      if (v == null) return "";
      return String(v)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&apos;");
    }

    _saveXml(xml, fnameBase) {
      // 1) SAPUI5 (soportado dentro de SAC)
      try {
        if (window.sap && sap.ui && sap.ui.core && sap.ui.core.util && sap.ui.core.util.File) {
          sap.ui.core.util.File.save(xml, fnameBase, "xml", "application/xml",
