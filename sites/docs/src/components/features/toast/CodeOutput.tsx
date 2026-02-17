import { useRef } from 'react'
import type { PlaygroundState } from './Controls'

interface CodeOutputProps {
  state: PlaygroundState
}

export default function CodeOutput({ state }: CodeOutputProps): React.ReactNode {
  const codeRef = useRef<HTMLPreElement>(null)

  const hasClassName = state.styleMode === 'tailwind' && state.className.trim() !== ''

  const generateCode = (): string => {
    const lines: string[] = []
    lines.push("import { toast } from '@arxdn/toast'")
    lines.push('')

    const hasOptions =
      state.position !== 'top-right' ||
      state.duration !== 3000 ||
      !state.dismissible ||
      !state.pauseOnHover ||
      hasClassName

    if (hasOptions) {
      const opts: string[] = []
      if (state.position !== 'top-right') opts.push(`  position: '${state.position}'`)
      if (state.duration !== 3000) opts.push(`  duration: ${state.duration}`)
      if (!state.dismissible) opts.push(`  dismissible: false`)
      if (!state.pauseOnHover) opts.push(`  pauseOnHover: false`)
      if (hasClassName) opts.push(`  className: '${state.className.trim()}'`)

      lines.push(`toast.${state.type}('${state.message}', {`)
      lines.push(opts.join(',\n'))
      lines.push('})')
    } else {
      lines.push(`toast.${state.type}('${state.message}')`)
    }

    return lines.join('\n')
  }

  const code = generateCode()

  const handleCopy = (): void => {
    navigator.clipboard.writeText(code)
  }

  const hasOptions =
    state.position !== 'top-right' ||
    state.duration !== 3000 ||
    !state.dismissible ||
    !state.pauseOnHover ||
    hasClassName

  return (
    <div className="group relative">
      <div className="overflow-x-auto rounded-lg border border-surface-0 bg-mantle p-4">
        <pre ref={codeRef} className="font-mono text-sm leading-relaxed">
          <span className="text-pink">import</span>
          <span className="text-text"> {'{ '}</span>
          <span className="text-yellow">toast</span>
          <span className="text-text">{' }'} </span>
          <span className="text-pink">from</span>
          <span className="text-green"> &apos;@arxdn/toast&apos;</span>
          {'\n\n'}
          <span className="text-yellow">toast</span>
          <span className="text-text">.</span>
          <span className="text-blue">{state.type}</span>
          <span className="text-text">(</span>
          <span className="text-green">&apos;{state.message}&apos;</span>
          {hasOptions && (
            <>
              <span className="text-text">, {'{'}</span>
              {'\n'}
              {state.position !== 'top-right' && (
                <>
                  <span className="text-text">{'  '}</span>
                  <span className="text-pink">position</span>
                  <span className="text-text">: </span>
                  <span className="text-green">&apos;{state.position}&apos;</span>
                  <span className="text-text">,</span>
                  {'\n'}
                </>
              )}
              {state.duration !== 3000 && (
                <>
                  <span className="text-text">{'  '}</span>
                  <span className="text-pink">duration</span>
                  <span className="text-text">: </span>
                  <span className="text-peach">{state.duration}</span>
                  <span className="text-text">,</span>
                  {'\n'}
                </>
              )}
              {!state.dismissible && (
                <>
                  <span className="text-text">{'  '}</span>
                  <span className="text-pink">dismissible</span>
                  <span className="text-text">: </span>
                  <span className="text-peach">false</span>
                  <span className="text-text">,</span>
                  {'\n'}
                </>
              )}
              {!state.pauseOnHover && (
                <>
                  <span className="text-text">{'  '}</span>
                  <span className="text-pink">pauseOnHover</span>
                  <span className="text-text">: </span>
                  <span className="text-peach">false</span>
                  <span className="text-text">,</span>
                  {'\n'}
                </>
              )}
              {hasClassName && (
                <>
                  <span className="text-text">{'  '}</span>
                  <span className="text-pink">className</span>
                  <span className="text-text">: </span>
                  <span className="text-green">&apos;{state.className.trim()}&apos;</span>
                  <span className="text-text">,</span>
                  {'\n'}
                </>
              )}
              <span className="text-text">{'}'}</span>
            </>
          )}
          <span className="text-text">)</span>
        </pre>
      </div>
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded border border-surface-1 bg-surface-0 px-2 py-1 text-xs text-subtext-0 opacity-0 transition-all hover:border-mauve hover:text-mauve group-hover:opacity-100"
      >
        Copy
      </button>
    </div>
  )
}
