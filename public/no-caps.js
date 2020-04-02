/* global HTMLInputElement, customElements */
class NoCaps extends HTMLInputElement {
  constructor(...args) {
    super(...args);
    this.addEventListener("input", () => {
      this.value = this.value.toLowerCase();
    });
  }
}
customElements.define("no-caps", NoCaps, { extends: "input" });
