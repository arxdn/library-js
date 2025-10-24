# @arxdn/shared

Shared utilities library for ARXDN projects.

## Installation

```bash
npm install @arxdn/shared
```

## Features

### ID Generator

Generates unique IDs with customizable options:

```typescript
import { uniqueId, generateId, createIdGenerator } from '@arxdn/shared'

// Basic unique ID
const id = uniqueId.generate()

// ID with prefix
const idWithPrefix = uniqueId.create('user')

// Advanced options
const customId = generateId({
  prefix: 'order',
  length: 12,
  useTimestamp: true,
  useRandom: true,
})

// Dedicated generator
const userIdGenerator = createIdGenerator('user')
const userId = userIdGenerator({ length: 6 })
```

## Generator Options

- `prefix`: ID prefix (string)
- `length`: Random part length (number, default: 9)
- `useTimestamp`: Include timestamp (boolean, default: true)
- `useRandom`: Include random part (boolean, default: true)

## License

MIT
