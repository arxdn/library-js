import type { GenerateIdOptions, IdGenerator, UniqueId } from './types/index'

const DEFAULT_OPTIONS: Required<GenerateIdOptions> = {
  prefix: '',
  length: 9,
  useTimestamp: true,
  useRandom: true,
}

function generateIdString(options: GenerateIdOptions = {}): string {
  const config = { ...DEFAULT_OPTIONS, ...options }
  const parts: string[] = []

  if (config.prefix) {
    parts.push(config.prefix)
  }

  if (config.useTimestamp) {
    parts.push(Date.now().toString(36))
  }

  if (config.useRandom) {
    const randomPart = Math.random()
      .toString(36)
      .substring(2, 2 + config.length)
    parts.push(randomPart)
  }

  return parts.join('-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

export const uniqueId: UniqueId = {
  generate: generateIdString,
  create: (prefix?: string) => generateIdString({ prefix }),
}

export function createIdGenerator(prefix?: string): IdGenerator {
  return (options?: GenerateIdOptions) => generateIdString({ ...options, prefix })
}

export { generateIdString as generateId }
