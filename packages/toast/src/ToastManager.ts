import { DEFAULT_OPTIONS } from './constants'
import { Position, ToastInstance, ToastOptions, ToastType } from './types'

interface CleanupFn {
  (): void
}

interface ToastEntry {
  instance: ToastInstance
  cleanup: CleanupFn
}

interface ResolvedOptions {
  duration: number
  position: Position
  type: ToastType
  dismissible: boolean
  pauseOnHover: boolean
  className: string
  icon: string
  onDismiss: ((instance: ToastInstance) => void) | null | undefined
}

export class ToastManager {
  private toasts: Map<string, ToastEntry>
  private containers: Map<Position, HTMLElement>
  private cleanupFns: Map<string, CleanupFn>

  constructor() {
    this.toasts = new Map()
    this.containers = new Map()
    this.cleanupFns = new Map()
  }

  getContainer(position: Position): HTMLElement {
    const existing = this.containers.get(position)
    if (existing) {
      return existing
    }

    const container = document.createElement('div')
    container.className = `ui-toast-container ${position}`
    container.setAttribute('data-position', position)
    document.body.appendChild(container)
    this.containers.set(position, container)

    return container
  }

  private resolveOptions(options: ToastOptions): ResolvedOptions {
    return {
      duration: options.duration ?? DEFAULT_OPTIONS.duration,
      position: options.position ?? DEFAULT_OPTIONS.position,
      type: (options.type ?? DEFAULT_OPTIONS.type) as ToastType,
      dismissible: options.dismissible ?? DEFAULT_OPTIONS.dismissible,
      pauseOnHover: options.pauseOnHover ?? DEFAULT_OPTIONS.pauseOnHover,
      className: options.className ?? DEFAULT_OPTIONS.className,
      icon: options.icon ?? DEFAULT_OPTIONS.icon,
      onDismiss: options.onDismiss ?? null,
    }
  }
}
