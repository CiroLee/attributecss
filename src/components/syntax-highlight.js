class SyntaxHighlight extends HTMLElement {
  static {
    customElements.define('syntax-highlight', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['language'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'language') {
      this.language = newValue;
    }

    this.#render();
  }
  set code(value) {
    this.innerHTML = value;
    this.#render(this.getAttribute('language'));
  }
  #render() {
    let code = this.innerHTML;
    const html = hljs.highlight(code, { language: this.language }).value;

    this.shadowRoot.innerHTML /* html */ = `
    <style>
    .syntax-highlight {
      font-size: 14px;
      white-space: pre;
      display: block;
      color: currentColor;
      pre {
        margin: 0;
      }
    }
    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#f3f3f3;color:#444}.hljs-comment{color:#697070}.hljs-punctuation,.hljs-tag{color:#444a}.hljs-tag .hljs-attr,.hljs-tag .hljs-name{color:#444}.hljs-attribute,.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-name,.hljs-selector-tag{font-weight:700}.hljs-deletion,.hljs-number,.hljs-quote,.hljs-selector-class,.hljs-selector-id,.hljs-string,.hljs-template-tag,.hljs-type{color:#800}.hljs-section,.hljs-title{color:#800;font-weight:700}.hljs-link,.hljs-operator,.hljs-regexp,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-symbol,.hljs-template-variable,.hljs-variable{color:#ab5656}.hljs-literal{color:#695}.hljs-addition,.hljs-built_in,.hljs-bullet,.hljs-code{color:#397300}.hljs-meta{color:#1f7199}.hljs-meta .hljs-string{color:#38a}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}
    </style>
    <div part="syntax-highlight" class="syntax-highlight"><pre language="${this.language}"><code>${html}</code></pre></div>`;
  }
}
