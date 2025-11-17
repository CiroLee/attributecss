class UICode extends HTMLElement {
  static {
    customElements.define('ui-code', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        :host {
          display: inline-block;
        }
        .code {
          display: inline-flex;
          align-items: center;
          height: 22px;
          padding: 0 6px;
          border-radius: 4px;
          border: 1px solid #c4c4c4;
          box-sizing: border-box;
          background-color: #f2f2f2;
        }
      </style>
      <code class="code"><slot></slot></code>
    `;
  }
}
