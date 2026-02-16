export interface GenerateIdOptions {
  prefix?: string
  length?: number
  useTimestamp?: boolean
  useRandom?: boolean
}

export interface IdGenerator {
  (options?: GenerateIdOptions): string
}

export interface UniqueId {
  generate: IdGenerator
  create: (prefix?: string) => void | string
}
