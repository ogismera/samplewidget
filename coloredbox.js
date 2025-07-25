(function () {

console.log("hello.js loaded");
class Hello extends HTMLElement {
constructor() {
super();
const root = this.attachShadow({ mode: "open" });
root.innerHTML = "<div style='padding:8px;font-family:sans-serif'>Widget cargado ✅</div>";
}
}
customElements.define("com-oscar-exportxmlwidget", Hello);
})();
