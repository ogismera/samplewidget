(function () {

  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host{ display:block; font-family:sans-serif; }
      pre{
        max-height:240px;
        overflow:auto;
        background:#f7f7f7;
        padding:8px;
        white-space:pre-wrap;
      }
    </style>
    <pre id="preview"></pre>
  `;

  class ExportXmlWidget extends HTMLElement {

    constructor() {
      super();
      // Para comprobar que realmente carga
      console.log("ExportXmlWidget.js loaded");

      this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
      this._preview = this.shadowRoot.getElementById("preview");

      // Deben existir porque el manifest las declara como properties
      this.fileName = "export";
      this.payload  = "";
      this._trigger = false; // trigger interno
    }

    /* ===== setters/getters para que el método exportXml() (body: this.trigger = true;) funcione ===== */
    set trigger(v) {
      const nv = !!v;
      this._trigger = nv;
      if (nv) {
        this.runExport();   // Lógica real
        this._trigger = false; // auto-reset
      }
    }
    get trigger() {
      return this._trigger;
    }

    /* ===== hooks del runtime SAC (como en los ejemplos del repo) ===== */
    onCustomWidgetBeforeUpdate(_) {}

    onCustomWidgetAfterUpdate(changedProps) {
      if (!changedProps) return;

      if (Object.prototype.hasOwnProperty.call(changedProps, "fileName")) {
        this.fileName = changedProps.fileName;
      }
      if (Object.prototype.hasOwnProperty.call(changedProps, "payload")) {
        this.payload = changedProps.payload;
        // preview opcional
        this._preview.textContent = this.payload;
      }
      if (Object.prototype.hasOwnProperty.call(changedProps, "trigger")) {
        this.trigger = !!changedProps.trigger;  // dispara exportación si es true
      }
    }

    /* ================= LÓGICA REAL ================= */
    runExport() {
      const xml = this._ensureXml(this.payload || "");
      this._preview.textContent = xml; // preview opcional

      // 1) Camino soportado por SAC (SAPUI5)
      try {
        if (window.sap && sap.ui && sap.ui.core && sap.ui.core.util && sap.ui.core.util.File) {
          sap.ui.core.util.File.save(xml, this.fileName, "xml", "application/xml", "utf-8");
          this.dispatchEvent(new CustomEvent("onExported"));
          return;
        }
      } catch (e) {
        console.warn("sap.ui.core.util.File.save failed, fallback to Blob", e);
      }

      // 2) Fallback navegador estándar
      try {
        const blob = new Blob([xml], { type: "application/xml;charset=utf-8;" });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement("a");
        a.href = url;
        a.download = this.fileName + ".xml";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (e2) {
        // 3) Último recurso
        if (window.Application && Application.openNewWindow) {
          const u = "data:text/xml;charset=utf-8," + encodeURIComponent(xml);
          Application.openNewWindow(u);
        }
      }

      this.dispatchEvent(new CustomEvent("onExported"));
    }

    _ensureXml(text) {
      const str = (typeof text === "string") ? text : String(text || "");

      // ¿JSON array? -> convertir a XML tabular
      let arr, isArray = false;
      try {
        arr = JSON.parse(str);
        if (arr && arr.length !== undefined) isArray = true;
      } catch (e) { /* not json */ }

      if (isArray) {
        return this._jsonArrayToXml(arr);
      } else {
        if (str.indexOf("<?xml") !== 0) {
          return '<?xml version="1.0" encoding="UTF-8"?>\n' + str;
        }
        return str;
      }
    }

    _jsonArrayToXml(arr) {
      const lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rows>'
      ];
      for (let i = 0; i < arr.length; i++) {
        const row = arr[i];
        lines.push('  <row>');
        for (const k in row) {
          if (Object.prototype.hasOwnProperty.call(row, k)) {
            lines.push('    <' + k + '>' + this._escapeXml(row[k]) + '</' + k + '>');
          }
        }
        lines.push('  </row>');
      }
      lines.push('</rows>');
      return lines.join('\n');
    }

    _escapeXml(v) {
      if (v == null) return "";
      return String(v)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    }
  }

  // === Tag EXACTAMENTE igual que el que declares en el manifest ===
  customElements.define("com-oscar-exportxmlwidget", ExportXmlWidget);

})();
