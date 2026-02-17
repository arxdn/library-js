import { useState } from 'react'
import Controls from './Controls'
import Preview from './Preview'
import CodeOutput from './CodeOutput'
import StyleEditor from './StyleEditor'
import type { PlaygroundState } from './Controls'

const DEFAULT_STATE: PlaygroundState = {
  message: 'Hello from ARXDN!',
  type: 'success',
  position: 'top-right',
  duration: 3000,
  dismissible: true,
  pauseOnHover: true,
  styleMode: 'default',
  className: '',
}

export default function Playground(): React.ReactNode {
  const [state, setState] = useState<PlaygroundState>(DEFAULT_STATE)

  const update = (patch: Partial<PlaygroundState>): void => {
    setState(prev => ({ ...prev, ...patch }))
  }

  const fireToast = (): void => {
    import('@arxdn/toast').then(({ toast }) => {
      const method = toast[state.type as keyof typeof toast]
      if (typeof method === 'function') {
        const opts: Record<string, unknown> = {
          position: state.position,
          duration: state.duration,
          dismissible: state.dismissible,
          pauseOnHover: state.pauseOnHover,
        }
        if (state.styleMode === 'tailwind' && state.className.trim()) {
          opts.className = state.className.trim()
        }
        ;(method as (msg: string, opts?: Record<string, unknown>) => void)(state.message, opts)
      }
    })
  }

  const dismissAll = (): void => {
    import('@arxdn/toast').then(({ toast }) => {
      toast.dismissAll()
    })
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Left: Controls + Style Editor */}
      <div className="flex flex-col gap-6">
        <div className="rounded-lg border border-surface-0 bg-surface-0/20 p-6">
          <h3 className="mb-4 font-pixel text-xs text-mauve">CONTROLS</h3>
          <Controls state={state} onChange={setState} />
        </div>

        <div className="rounded-lg border border-surface-0 bg-surface-0/20 p-6">
          <h3 className="mb-4 font-pixel text-xs text-blue">STYLING</h3>
          <StyleEditor
            mode={state.styleMode}
            className={state.className}
            onModeChange={mode => update({ styleMode: mode })}
            onClassNameChange={cn => update({ className: cn })}
          />
        </div>
      </div>

      {/* Right: Preview + Code */}
      <div className="flex flex-col gap-6">
        <div className="rounded-lg border border-surface-0 bg-surface-0/20 p-6">
          <h3 className="mb-4 font-pixel text-xs text-mauve">PREVIEW</h3>
          <Preview state={state} onFire={fireToast} onDismissAll={dismissAll} />
        </div>

        <div>
          <h3 className="mb-3 font-pixel text-xs text-mauve">CODE</h3>
          <CodeOutput state={state} />
        </div>
      </div>
    </div>
  )
}
