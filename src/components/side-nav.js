import { navigationConfig } from '../config/navigation.config.js';
class SideNav extends HTMLElement {
  activeId = '';
  static {
    customElements.define('side-nav', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static get observedAttributes() {
    return ['active'];
  }
  connectedCallback() {
    this.#render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active') {
      this.activeId = newValue;
    }
  }
  #renderList() {
    const result = navigationConfig.map((item) => {
      if (item.children && item.children.length) {
        return `<div class="nav-group">
          <div class="nav-group__title">${item.label}</div>${item.children.map((child) => `<a href="${child.path}" id="${child.id}" class="nav-link">${child.label}</a>`).join('')}
        </div>`;
      }
      return `<a href="${item.path}" id="${item.id}" class="nav-link">${item.label}</a>`;
    });
    return result.join('');
  }
  #render() {
    const list = this.#renderList();
    console.log(list);
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        .side-nav {
          position: fixed;
          top: 56px;
          bottom: 0;
          width: 240px;
          display: flex;
          flex-direction: column;
          padding: 8px;
          box-sizing: border-box;
          overflow: auto;
        }
        .nav-group {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
        }
        .nav-group__title {
          font-size: 14px;
          margin-bottom: 8px;
          color: gray;
        }
        a {
          text-decoration: none;
          color: #959595;
          font-size: 14px;
          position: relative;
          text-indent: 12px;
          height: 24px;
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
          &::before {
            content: '';
            font-weight: bold;
            position: absolute;
            height: 100%;
            width: 2px;
            left: 0;
            background-color: #e3e1e1;
          }
          &:hover {
            color: var(--primary-color);
          }
          &.active {
            color: var(--primary-color);
            font-weight: bold;
            &::before {
              background-color: var(--primary-color);
            }
          }
        }
        @media (max-width: 928px) {
          .side-nav {
            display: none;
          }
        }
      </style>
      <side class="side-nav">${list}</side>
    `;
    this.#initActive(this.activeId);
  }
  #initActive(activeId) {
    const activeLink = this.shadowRoot.querySelector(`#${activeId}`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}
