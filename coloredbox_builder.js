(function () {

  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host{ display:block; font-family:sans-serif; padding:8px; }
      label{ display:block; font-weight:bold; margin-bottom:4px; }
      input, textarea{
        width:100%;
        box-sizing:border-box;
        padding:4px;
        font-family: monospace;
      }
      textarea{ height:100px; }
      button{ margin-top:8px; }
    </style>
    <label>File name</label>
    <input id="fn" type="text" placeholder="export"/>
    <label style="margin-top:8px;">Payload (solo vista previa)</label>
    <textarea id="pl"></textarea>
    <button id="go">Trigger export</button>
  `;

  class ExportXmlWidgetBuilder extends HTMLElement {

    constructor() {
      super();
      this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
    }

    set widget(w) {
      this._widget = w;

      const fn = this.shadowRoot.getElementById("fn");
      const pl = this.shadowRoot.getElementById("pl");
      const go = this.shadowRoot.getElementById("go");

      fn.value = (w && w.fileName) ? w.fileName : "export";
      pl.value = (w && w.payload)  ? w.payload  : "";

      const self = this;

      fn.addEventListener("change", function () {
        // El cuerpo del método setFileName en el manifest (this.fileName = text;)
        if (self._widget && self._widget.setFileName) {
          self._widget.setFileName(this.value);
        } else {
          self._widget.fileName = this.value;
        }
      });

      pl.addEventListener("change", function () {
        if (self._widget && self._widget.setPayload) {
          self._widget.setPayload(this.value);
        } else {
          self._widget.payload = this.value;
        }
      });

      go.addEventListener("click", function () {
        if (self._widget && self._widget.exportXml) {
          self._widget.exportXml(); // body: this.trigger = true;
        } else {
          self._widget.trigger = true;
        }
      });
    }
  }

  customElements.define("com-oscar-exportxmlwidget-builder", ExportXmlWidgetBuilder);

})();
