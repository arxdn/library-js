import type { PlaygroundState } from './Controls'

interface PreviewProps {
  state: PlaygroundState
  onFire: () => void
  onDismissAll: () => void
}

export default function Preview({ state, onFire, onDismissAll }: PreviewProps): React.ReactNode {
  return (
    <div className="flex flex-col gap-4">
      {/* Position visualizer */}
      <div className="relative aspect-video w-full rounded-lg border border-surface-0 bg-mantle/50">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 p-2">
          {[
            'top-left',
            'top-center',
            'top-right',
            'bottom-left',
            'bottom-center',
            'bottom-right',
          ].map(pos => (
            <div
              key={pos}
              className={`flex items-center justify-center rounded text-xs transition-all ${
                pos.startsWith('top') ? 'self-start' : 'self-end'
              } ${
                state.position === pos
                  ? 'bg-mauve/20 text-mauve ring-1 ring-mauve/50'
                  : 'text-overlay-0'
              }`}
            >
              {state.position === pos && (
                <div className="animate-pulse rounded bg-mauve/30 px-2 py-1 text-xs">
                  {state.type}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-overlay-0">
          {state.position}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={onFire}
          className="flex-1 rounded-lg border border-mauve bg-mauve/10 py-2.5 font-pixel text-xs text-mauve transition-all hover:bg-mauve/20 hover:shadow-neon-mauve active:scale-95"
        >
          FIRE TOAST
        </button>
        <button
          onClick={onDismissAll}
          className="rounded-lg border border-surface-1 px-4 py-2.5 text-xs text-subtext-0 transition-all hover:border-red hover:text-red active:scale-95"
        >
          Clear All
        </button>
      </div>
    </div>
  )
}
