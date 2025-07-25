(function () {

// 🔴 Break 0: el archivo se cargó
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

// Internos
this._fileName = "export";
this._payload = "";

// ===== getters/setters que el manifest tocará con los bodies simples =====
Object.defineProperty(this, "fileName", {
get: () => this._fileName,
set: (v) => {
debugger; // 🔴 Break 2
console.log("[ExportXmlWidget] set fileName =", v);
this._fileName = v || "export";
}
});

Object.defineProperty(this, "payload", {
get: () => this._payload,
set: (value) => {
debugger; // 🔴 Break 3
console.log("[ExportXmlWidget] set payload (dispara export) =", value);

this._payload = (typeof value === "string") ? value : String(value || "");
this._preview.textContent = this._payload;

this._exportNow(this._payload);
}
});
}

// ===== hooks del runtime (si SAC te empuja props) =====
onCustomWidgetAfterUpdate(changedProps) {
debugger; // 🔴 Break 4
console.log("[ExportXmlWidget] afterUpdate", changedProps);
if (!changedProps) return;
if (Object.prototype.hasOwnProperty.call(changedProps, "fileName")) this.fileName = changedProps.fileName;
if (Object.prototype.hasOwnProperty.call(changedProps, "payload")) this.payload = changedProps.payload; // también exporta
}

// ================== LÓGICA REAL ==================
_exportNow(text) {
debugger; // 🔴 Break 5
console.log("[ExportXmlWidget] _exportNow");

const xml = this._ensureXml(text || "");
this._preview.textContent = xml;

// 1) Camino soportado por SAC (SAPUI5)
try {
if (window.sap && sap.ui && sap.ui.core && sap.ui.core.util && sap.ui.core.util.File) {
sap.ui.core.util.File.save(xml, this._fileName, "xml", "application/xml", "utf-8");
this.dispatchEvent(new CustomEvent("onExported"));
console.log("[ExportXmlWidget] Export done via sap.ui.core.util.File.save");
return;
}
} catch (e) {
console.warn("[ExportXmlWidget] File.save failed, fallback", e);
}

// 2) Fallback navegador estándar
try {
const blob = new Blob([xml], { type: "application/xml;charset=utf-8;" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = this._fileName + ".xml";
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

_ensureXml(text) {
let str = (typeof text === "string") ? text : String(text || "");

// ¿Es JSON array? -> convertir a XML tabular
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
lines.push(' <row>');
for (const k in row) {
if (Object.prototype.hasOwnProperty.call(row, k)) {
lines.push(' <' + k + '>' + this._escapeXml(row[k]) + '</' + k + '>');
}
}
lines.push(' </row>');
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

// Tag EXACTO al del manifest
customElements.define("com-oscar-exportxmlwidget", ExportXmlWidget);

})();
