import type { ChangeEvent } from 'react'

interface StylePreset {
  name: string
  className: string
  label: string
}

const PRESETS: StylePreset[] = [
  {
    name: 'neon-purple',
    label: 'Neon Purple',
    className:
      'bg-purple-950 text-purple-200 border border-purple-500 px-4 py-3 rounded-lg shadow-lg shadow-purple-500/20',
  },
  {
    name: 'glassmorphism',
    label: 'Glass',
    className:
      'bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-3 rounded-xl shadow-xl',
  },
  {
    name: 'retro-green',
    label: 'Retro Terminal',
    className:
      'bg-black text-green-400 border-2 border-green-500 px-4 py-3 rounded-none font-mono shadow-lg shadow-green-500/20',
  },
  {
    name: 'gradient',
    label: 'Gradient',
    className:
      'bg-gradient-to-r from-pink-500 to-violet-500 text-white px-4 py-3 rounded-2xl shadow-lg border-0',
  },
  {
    name: 'minimal',
    label: 'Minimal',
    className: 'bg-zinc-900 text-zinc-100 border border-zinc-700 px-4 py-3 rounded-md text-sm',
  },
  {
    name: 'brutalist',
    label: 'Brutalist',
    className:
      'bg-yellow-300 text-black border-4 border-black px-4 py-3 rounded-none font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
  },
]

interface StyleEditorProps {
  mode: 'default' | 'tailwind'
  className: string
  onModeChange: (mode: 'default' | 'tailwind') => void
  onClassNameChange: (className: string) => void
}

export default function StyleEditor({
  mode,
  className,
  onModeChange,
  onClassNameChange,
}: StyleEditorProps): React.ReactNode {
  return (
    <div className="flex flex-col gap-4">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            onModeChange('default')
            onClassNameChange('')
          }}
          className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-all ${
            mode === 'default'
              ? 'border-mauve bg-mauve/20 text-mauve'
              : 'border-surface-0 bg-surface-0/30 text-subtext-0 hover:border-surface-1'
          }`}
        >
          Default Styles
        </button>
        <button
          onClick={() => onModeChange('tailwind')}
          className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-all ${
            mode === 'tailwind'
              ? 'border-blue bg-blue/20 text-blue'
              : 'border-surface-0 bg-surface-0/30 text-subtext-0 hover:border-surface-1'
          }`}
        >
          Custom Tailwind
        </button>
      </div>

      {mode === 'tailwind' && (
        <>
          {/* Presets */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-subtext-0">Presets</label>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => onClassNameChange(preset.className)}
                  className={`rounded-md border px-2.5 py-1 text-xs transition-all ${
                    className === preset.className
                      ? 'border-blue bg-blue/20 text-blue'
                      : 'border-surface-0 bg-surface-0/30 text-subtext-0 hover:border-surface-1 hover:text-text'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom input */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-subtext-0">
              Tailwind Classes
            </label>
            <textarea
              value={className}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onClassNameChange(e.target.value)}
              className="w-full rounded-lg border border-surface-0 bg-mantle px-3 py-2 font-mono text-xs text-text outline-none transition-colors focus:border-blue"
              placeholder="bg-zinc-900 text-white px-4 py-3 rounded-lg ..."
              rows={3}
              spellCheck={false}
            />
            <p className="mt-1 text-xs text-overlay-0">
              Any Tailwind CSS classes — applied via the{' '}
              <code className="text-blue">className</code> option
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export { PRESETS }
export type { StyleEditorProps }
