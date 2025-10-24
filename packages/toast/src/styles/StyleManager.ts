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
/* Toast Container Styles - Solo posición y z-index */
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

/* Toast Base Styles - Solo estructura básica */
.ui-toast {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${BASE_STYLES.fontFamily};
  font-size: ${BASE_STYLES.fontSize};
  margin: ${BASE_STYLES.margin};
  max-width: ${BASE_STYLES.maxWidth};
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  word-wrap: break-word;
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
}

.ui-toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
  transition: width linear;
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
