(function () {

  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host{ display:block; font-family:sans-serif; }
      button{ cursor:pointer; }
      pre{ max-height:200px; overflow:auto; background:#f7f7f7; padding:8px; }
      .toolbar{ display:flex; gap:8px; margin-bottom:8px; }
    </style>
    <div class="toolbar">
      <select id="fmt">
        <option value="json">JSON</option>
        <option value="xml">XML</option>
      </select>
      <button id="btn">Download</button>
    </div>
    <pre id="preview"></pre>
  `;

  class JsonXmlExporter extends HTMLElement {

    constructor() {
      super();
      this._payload  = "";
      this._format   = "json";
      this._fileName = "export";

      this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
      this._$btn   = this.shadowRoot.getElementById("btn");
      this._$fmt   = this.shadowRoot.getElementById("fmt");
      this._$prev  = this.shadowRoot.getElementById("preview");

      this._$btn.addEventListener("click", () => this.export());
      this._$fmt.addEventListener("change", () => {
        this._format = this._$fmt.value;
        this._renderPreview();
      });
    }

    // -------- Métodos públicos (manifest.json) --------
    setPayload(v)  { this._payload = v || ""; this._renderPreview(); }
    setFormat(v)   { this._format  = (v || "json").toLowerCase(); this._$fmt.value = this._format; this._renderPreview(); }
    setFileName(v) { this._fileName = v || "export"; }

    export() {
      var dataStr = this._buildOutput();
      var fmt     = this._format === "xml" ? "xml" : "json";
      var mime    = fmt === "xml" ? "application/xml" : "application/json";

      if (window.sap && sap.ui && sap.ui.core && sap.ui.core.util && sap.ui.core.util.File) {
        // Método oficial soportado por SAC
        sap.ui.core.util.File.save(dataStr, this._fileName, fmt, mime, "utf-8");
      } else {
        // Fallback (por si lo ejecutas fuera de SAC)
        var blob = new Blob([dataStr], { type: mime + ";charset=utf-8;" });
        var url  = URL.createObjectURL(blob);
        var a    = document.createElement("a");
        a.href = url;
        a.download = this._fileName + "." + fmt;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      this.dispatchEvent(new CustomEvent("onExported"));
    }

    onCustomWidgetAfterUpdate(changedProps) {
      if (changedProps.format)    { this.setFormat(changedProps.format); }
      if (changedProps.payload)   { this.setPayload(changedProps.payload); }
      if (changedProps.fileName)  { this.setFileName(changedProps.fileName); }
    }

    // ---------------- Helpers internos ----------------
    _renderPreview() {
      try {
        var out = this._buildOutput();
        this._$prev.textContent = out;
      } catch (e) {
        this._$prev.textContent = "Invalid payload: " + e.message;
      }
    }

    _buildOutput() {
      if (!this._payload || this._payload.trim() === "") {
        return this._format === "xml" ? "<rows/>" : "[]";
      }
      var arr = JSON.parse(this._payload); // esperamos un array de objetos
      if (this._format === "xml") {
        return this._jsonToXml(arr);
      } else {
        return JSON.stringify(arr, null, 2);
      }
    }

    _jsonToXml(arr) {
      var lines = [];
      lines.push('<?xml version="1.0" encoding="UTF-8"?>');
      lines.push("<rows>");
      for (var i = 0; i < arr.length; i++) {
        var row = arr[i];
        lines.push("  <row>");
        for (var key in row) {
          lines.push("    <" + key + ">" + this._escapeXml(row[key]) + "</" + key + ">");
        }
        lines.push("  </row>");
      }
      lines.push("</rows>");
      return lines.join("\n");
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

  window.customElements.define("com-oscar-jsonexporter", JsonXmlExporter);
})();