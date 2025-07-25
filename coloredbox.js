(function () {
debugger;
console.log("hello.js loaded");
const template = document.createElement("template");
template.innerHTML = `
<style>
:host{ display:block; font-family:sans-serif; }
pre{ max-height:240px; overflow:auto; background:#f7f7f7; padding:8px; white-space:pre-wrap; }
</style>
<pre id="preview"></pre>
`;

class ExportXmlWidget extends HTMLElement {
constructor() {
super();
debugger;
this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));

this._preview = this.shadowRoot.getElementById("preview");

// propiedades que el manifest conoce
this.fileName = "export";
this.payload = "";

// trigger interno
this._trigger = false;
}

/* ===== setters/getters para que el body simple funcione ===== */
set trigger(v) {
const nv = !!v;
this._trigger = nv;
if (nv) {
this._exportNow();
this._trigger = false; // auto-reset
}
}
get trigger() {
return this._trigger;
}

/* ===== hooks del runtime (por si cambias props desde scripting) ===== */
onCustomWidgetAfterUpdate(changedProps) {
if (!changedProps) return;
if (Object.prototype.hasOwnProperty.call(changedProps, "fileName")) this.fileName = changedProps.fileName;
if (Object.prototype.hasOwnProperty.call(changedProps, "payload")) this.payload = changedProps.payload;
if (Object.prototype.hasOwnProperty.call(changedProps, "trigger")) this.trigger = !!changedProps.trigger;
}

/* ================== lógica real ================== */
_exportNow() {
const xml = this._ensureXml(this.payload || "");
this._preview.textContent = xml;

try {
if (window.sap && sap.ui && sap.ui.core && sap.ui.core.util && sap.ui.core.util.File) {
sap.ui.core.util.File.save(xml, this.fileName, "xml", "application/xml", "utf-8");
this.dispatchEvent(new CustomEvent("onExported"));
return;
}
} catch (e) { /* fallback */ }

try {
const blob = new Blob([xml], { type: "application/xml;charset=utf-8;" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = this.fileName + ".xml";
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);
} catch (e2) {
if (window.Application && Application.openNewWindow) {
const u = "data:text/xml;charset=utf-8," + encodeURIComponent(xml);
Application.openNewWindow(u);
}
}

this.dispatchEvent(new CustomEvent("onExported"));
}

_ensureXml(text) {
const str = (typeof text === "string") ? text : String(text || "");

let arr, isArray = false;
try {
arr = JSON.parse(str);
if (arr && arr.length !== undefined) isArray = true;
} catch (e) {}

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
"<rows>"
];
for (let i = 0; i < arr.length; i++) {
const row = arr[i];
lines.push(" <row>");
for (const k in row) {
if (Object.prototype.hasOwnProperty.call(row, k)) {
lines.push(" <" + k + ">" + this._escapeXml(row[k]) + "</" + k + ">");
}
}
lines.push(" </row>");
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

customElements.define("com-oscar-exportxmlwidget", ExportXmlWidget);

})();
