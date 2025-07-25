(function () {

  // 🔴 Break 0: al cargar el archivo
  debugger;
  console.log("[ExportXmlWidget] JS loaded");

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
        border:1px solid #ddd;
      }
    </style>
    <pre id="preview"></pre>
  `;

  class ExportXmlWidget extends HTMLElement {

    constructor() {
      super();

      // 🔴 Break 1: constructor
      debugger;
      console.log("[ExportXmlWidget] constructor");

      this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
      this._preview = this.shadowRoot.getElementById("preview");

      // Propiedades conocidas por el manifest
      this.fileName = "export";
    }

    /* ==========================
       MÉTODOS PÚBLICOS (manifest)
       ========================== */

    /** setFileName(fileName) — lo llamas desde SAC o lo invoca el body del manifest */
    setFileName(fileName) {
      // 🔴 Break 2
      debugger;
      console.log("[ExportXmlWidget] setFileName", fileName);
      this.fileName = fileName || "export";
    }

    /** exportXml(text) — recibe el PARÁMETRO con todos los datos y crea/descarga el XML */
    exportXml(text) {
      // 🔴 Break 3
      debugger;
      console.log("[ExportXmlWidget] exportXml(text)", text);

      const xml = this._ensureXml(text || "");
      this._preview.textContent = xml; // preview opcional

      // 1) Camino soportado por SAC (SAPUI5)
      try {
        if (window.sap && sap.ui && sap.ui.core && sap.ui.core.util && sap.ui.core.util.File) {
          sap.ui.core.util.File.save(xml, this.fileName, "xml", "application/xml", "utf-8");
          this.dispatchEvent(new CustomEvent("onExported"));
          console.log("[ExportXmlWidget] Export done via sap.ui.core.util.File.save");
          return;
        }
      } catch (e) {
        console.warn("[ExportXmlWidget] File.save failed, using fallback", e);
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
        console.log("[ExportXmlWidget] Export done via Blob fallback");
      } catch (e2) {
        console.warn("[ExportXmlWidget] Blob fallback failed, try openNewWindow", e2);
        if (window.Application && Application.openNewWindow) {
          const u = "data:text/xml;charset=utf-8," + encodeURIComponent(xml);
          Application.openNewWindow(u);
        }
      }

      this.dispatchEvent(new CustomEvent("onExported"));
    }

    /* ==========================
       Hooks del runtime (opcionales)
       ========================== */

    onCustomWidgetAfterUpdate(changedProps) {
      // 🔴 Break 4
      debugger;
      console.log("[ExportXmlWidget] afterUpdate", changedProps);
      // Si el runtime te empuja cambios en fileName vía propiedades, los recoges:
      if (changedProps && Object.prototype.hasOwnProperty.call(changedProps, "fileName")) {
        this.fileName = changedProps.fileName;
      }
    }

    /* ==========================
       Helpers internos
       ========================== */

    _ensureXml(text) {
      let str = (typeof text === "string") ? text : String(text || "");

      // ¿Es JSON array? -> conviértelo a XML tabular
      let arr, isArray = false;
      try {
        arr = JSON.parse(str);
        if (arr && arr.length !== undefined) isArray = true;
      } catch (e) {}

      if (isArray) {
        return this._jsonArrayToXml(arr);
      } else {
        if (str.indexOf("<?xml") !== 0) {
          str = '<?xml version="1.0" encoding="UTF-8"?>\n' + str;
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

  // Asegúrate que el TAG es EXACTAMENTE el mismo del manifest
  customElements.define("com-oscar-exportxmlwidget", ExportXmlWidget);

})();
