import { DEFAULT_THEME, BASE_STYLES, POSITIONS } from './DefaultStyles'

export class StyleManager {
  private static stylesInjected = false
  private static readonly STYLE_ID = 'toast-default-styles'

  static injectDefaultStyles(): void {
    if (this.stylesInjected) return
    this.stylesInjected = true

    const styles = this.generateStyles()

    const styleElement = document.createElement('style')
    styleElement.id = this.STYLE_ID
    styleElement.textContent = styles
    document.head.appendChild(styleElement)
  }

  static isStylesInjected(): boolean {
    return this.stylesInjected || !!document.getElementById(this.STYLE_ID)
  }

  private static generateStyles(): string {
    return `
/* Toast Default Styles */
.ui-toast-container {
  position: fixed;
  z-index: ${BASE_STYLES.zIndex};
  pointer-events: none;
}

.ui-toast-container > * {
  pointer-events: auto;
}

${Object.entries(POSITIONS)
  .map(
    ([position, styles]) => `
.ui-toast-container.${position} {
  ${Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join('\n  ')}
}`
  )
  .join('\n')}

.ui-toast {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${BASE_STYLES.fontFamily};
  font-size: ${BASE_STYLES.fontSize};
  background: ${BASE_STYLES.background};
  color: ${BASE_STYLES.color};
  padding: ${BASE_STYLES.padding};
  margin: ${BASE_STYLES.margin};
  max-width: ${BASE_STYLES.maxWidth};
  border-radius: ${BASE_STYLES.borderRadius};
  box-shadow: ${BASE_STYLES.boxShadow};
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  word-wrap: break-word;
  border: 1px solid transparent;
}

.ui-toast.show {
  opacity: 1;
  transform: translateY(0);
}

.ui-toast.hiding {
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.3s ease-in;
}

.ui-toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  min-width: 20px;
}

.ui-toast-message {
  flex: 1;
  line-height: 1.4;
}

.ui-toast-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  opacity: 0.7;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.ui-toast-close:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}

.ui-toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  transition: width linear;
}

/* Toast Type Styles */
.ui-toast.success:not([class*="bg-"]):not([class*="background-"]) {
  background: ${DEFAULT_THEME.success.background};
  color: ${DEFAULT_THEME.success.color};
  border: ${DEFAULT_THEME.success.border};
}

.ui-toast.error:not([class*="bg-"]):not([class*="background-"]) {
  background: ${DEFAULT_THEME.error.background};
  color: ${DEFAULT_THEME.error.color};
  border: ${DEFAULT_THEME.error.border};
}

.ui-toast.warning:not([class*="bg-"]):not([class*="background-"]) {
  background: ${DEFAULT_THEME.warning.background};
  color: ${DEFAULT_THEME.warning.color};
  border: ${DEFAULT_THEME.warning.border};
}

.ui-toast.info:not([class*="bg-"]):not([class*="background-"]) {
  background: ${DEFAULT_THEME.info.background};
  color: ${DEFAULT_THEME.info.color};
  border: ${DEFAULT_THEME.info.border};
}

.ui-toast.default:not([class*="bg-"]):not([class*="background-"]) {
  background: ${DEFAULT_THEME.default.background};
  color: ${DEFAULT_THEME.default.color};
  border: ${DEFAULT_THEME.default.border};
}

/* Responsive design */
@media (max-width: 640px) {
  .ui-toast {
    max-width: calc(100vw - 40px);
    margin: 6px;
  }
  
  .ui-toast-container.top-left,
  .ui-toast-container.top-right,
  .ui-toast-container.bottom-left,
  .ui-toast-container.bottom-right {
    left: 20px;
    right: 20px;
    transform: none;
  }
  
  .ui-toast-container.top-center,
  .ui-toast-container.bottom-center {
    left: 20px;
    right: 20px;
    transform: none;
  }
}
    `.trim()
  }
}
