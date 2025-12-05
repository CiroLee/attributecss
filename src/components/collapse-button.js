class CollapseButton extends HTMLElement {
  #isCollapsed = true;
  #button;
  static {
    customElements.define('collapse-button', CollapseButton);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = /* html */ `
    <style>
      :host {
        display: block;
      }
      .collapse-wrap {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 64px;
        bottom: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.05) 10%, transparent);
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: white;
        height: 36px;
        padding: 0 16px;
        border: 0;
        border-radius: 12px;
        background-color: #348ff0;
        text-decoration: none;
        corner-shape: superellipse(1.3);
        transition: background-color 0.2s ease;
        &:hover {
          background-color: #2e80d7;
        }
        &:active {
          background-color: #2c77c8;
        }
        &:focus-visible {
          outline: 2px solid #348ff0;
          outline-offset: 2px;
        }
      }

    </style>
    <div class="collapse-wrap">
      <button>EXPAND</button>
    </div>
    `;
    this.#button = this.shadowRoot.querySelector('button');
  }
  connectedCallback() {
    this.handleClick();
  }
  disconnectedCallback() {
    this.#button.removeEventListener('click', this.handleClick);
  }
  handleClick() {
    const collapseBtn = this.#button;
    const tableMore = document.getElementById('table-more');
    collapseBtn.addEventListener('click', () => {
      this.#isCollapsed = !this.#isCollapsed;
      if (this.#isCollapsed) {
        tableMore.setAttribute('hidden', '');
        collapseBtn.textContent = 'EXPAND';
      } else {
        tableMore.removeAttribute('hidden');
        collapseBtn.textContent = 'COLLAPSE';
      }
    });
  }
}
