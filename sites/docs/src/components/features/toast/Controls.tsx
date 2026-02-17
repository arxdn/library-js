import type { ChangeEvent } from 'react'

interface PlaygroundState {
  message: string
  type: string
  position: string
  duration: number
  dismissible: boolean
  pauseOnHover: boolean
  styleMode: 'default' | 'tailwind'
  className: string
}

interface ControlsProps {
  state: PlaygroundState
  onChange: (state: PlaygroundState) => void
}

const TYPES = ['success', 'error', 'warning', 'info', 'default'] as const
const POSITIONS = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const

export default function Controls({ state, onChange }: ControlsProps): React.ReactNode {
  const update = (patch: Partial<PlaygroundState>): void => {
    onChange({ ...state, ...patch })
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Message */}
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-xs font-medium text-subtext-0">Message</label>
        <input
          type="text"
          value={state.message}
          onChange={(e: ChangeEvent<HTMLInputElement>) => update({ message: e.target.value })}
          className="w-full rounded-lg border border-surface-0 bg-mantle px-3 py-2 text-sm text-text outline-none transition-colors focus:border-mauve"
          placeholder="Enter toast message..."
        />
      </div>

      {/* Type */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-subtext-0">Type</label>
        <div className="flex flex-wrap gap-1.5">
          {TYPES.map(t => (
            <button
              key={t}
              onClick={() => update({ type: t })}
              className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-all ${
                state.type === t
                  ? 'border-mauve bg-mauve/20 text-mauve shadow-neon-mauve'
                  : 'border-surface-0 bg-surface-0/30 text-subtext-0 hover:border-surface-1 hover:text-text'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Position */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-subtext-0">Position</label>
        <select
          value={state.position}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => update({ position: e.target.value })}
          className="w-full rounded-lg border border-surface-0 bg-mantle px-3 py-2 text-sm text-text outline-none transition-colors focus:border-mauve"
        >
          {POSITIONS.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Duration */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-subtext-0">
          Duration: {state.duration}ms
        </label>
        <input
          type="range"
          min="0"
          max="10000"
          step="500"
          value={state.duration}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            update({ duration: Number(e.target.value) })
          }
          className="w-full accent-mauve"
        />
        <div className="mt-1 flex justify-between text-xs text-overlay-0">
          <span>0 (persistent)</span>
          <span>10s</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={state.dismissible}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              update({ dismissible: e.target.checked })
            }
            className="h-4 w-4 rounded accent-mauve"
          />
          <span className="text-sm text-subtext-0">Dismissible</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={state.pauseOnHover}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              update({ pauseOnHover: e.target.checked })
            }
            className="h-4 w-4 rounded accent-mauve"
          />
          <span className="text-sm text-subtext-0">Pause on Hover</span>
        </label>
      </div>
    </div>
  )
}

export type { PlaygroundState }
