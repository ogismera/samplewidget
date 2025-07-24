(function () {
debugger;
var template = document.createElement("template");
template.innerHTML =
"<style>" +
" :host{ display:block; font-family:sans-serif; }" +
" pre{ max-height:240px; overflow:auto; background:#f7f7f7; padding:8px; white-space:pre-wrap; }" +
"</style>" +
"<pre id='preview'></pre>";

function Text2Xml() {
var self = Reflect.construct(HTMLElement, [], Text2Xml);
self._payload = "";
self._fileName = "export";

self.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
self._$prev = self.shadowRoot.getElementById("preview");
return self;
}

Text2Xml.prototype = Object.create(HTMLElement.prototype);
Text2Xml.prototype.constructor = Text2Xml;

// ===================== Métodos públicos (manifest.json) =====================

Text2Xml.prototype.setPayload = function (v) {
this._payload = v || "";
this._renderPreview();
};

Text2Xml.prototype.setFileName = function (v) {
this._fileName = v || "export";
};

/**
* Exporta a XML. Si le pasas `text`, usa ese string; si no, usa this._payload.
* Ejemplo desde SAC:
* Text2Xml_1.setFileName("export_123");
* Text2Xml_1.exportXml(TextArea_1.getValue());
*/
Text2Xml.prototype.exportXml = function (text) {
var payload = (typeof text === "string") ? text : this._payload;
var xml = this._buildXml(payload);

try {
if (window.sap && sap.ui && sap.ui.core && sap.ui.core.util && sap.ui.core.util.File) {
sap.ui.core.util.File.save(xml, this._fileName, "xml", "application/xml", "utf-8");
} else {
// Fallback (si lo pruebas fuera de SAC)
var blob = new Blob([xml], { type: "application/xml;charset=utf-8;" });
var url = URL.createObjectURL(blob);
var a = document.createElement("a");
a.href = url;
a.download = this._fileName + ".xml";
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);
}
} catch (e) {
// Último recurso: abrir en nueva pestaña (si CSP lo permite)
if (window.Application && Application.openNewWindow) {
var u = "data:text/xml;charset=utf-8," + encodeURIComponent(xml);
Application.openNewWindow(u);
}
}

this.dispatchEvent(new CustomEvent("onExported"));
};

// Hook de SAC para actualizar propiedades desde scripting
Text2Xml.prototype.onCustomWidgetAfterUpdate = function (changedProps) {
if (changedProps.payload) { this.setPayload(changedProps.payload); }
if (changedProps.fileName) { this.setFileName(changedProps.fileName); }
};

// ============================= Helpers internos =============================

Text2Xml.prototype._renderPreview = function () {
try {
var xml = this._buildXml(this._payload);
this._$prev.textContent = xml;
} catch (e) {
this._$prev.textContent = "Error: " + e.message;
}
};

Text2Xml.prototype._buildXml = function (raw) {
if (!raw || raw.trim() === "") {
return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<text></text>";
}

// Intentar parsear como JSON array -> <rows><row>...</row></rows>
var parsed = null;
var isJsonArray = false;
try {
parsed = JSON.parse(raw);
if (parsed && parsed.length !== undefined) {
isJsonArray = true;
}
} catch (e) {
isJsonArray = false;
}

if (isJsonArray) {
var lines = [];
lines.push('<?xml version="1.0" encoding="UTF-8"?>');
lines.push("<rows>");
for (var i = 0; i < parsed.length; i++) {
var row = parsed[i];
lines.push(" <row>");
for (var k in row) {
lines.push(" <" + k + ">" + this._escapeXml(row[k]) + "</" + k + ">");
}
lines.push(" </row>");
}
lines.push("</rows>");
return lines.join("\n");
} else {
return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<text>" + this._escapeXml(raw) + "</text>";
}
};

Text2Xml.prototype._escapeXml = function (v) {
if (v == null) return "";
return String(v)
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;")
.replace(/"/g, "&quot;")
.replace(/'/g, "&apos;");
};

window.customElements.define("com-oscar-text2xml", Text2Xml);

})();
