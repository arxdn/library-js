# @arxdn/toast

A modern, lightweight toast notification library for the browser. Zero dependencies, fully typed, and works with any framework or vanilla JS.

**~4KB gzipped** | **Zero dependencies** | **TypeScript first** | **Accessible**

[Documentation](https://arxdn.com/libraries/toast) | [GitHub](https://github.com/arxdn/library-js)

## Features

- **5 toast types** — success, error, warning, info, and default
- **6 positions** — top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
- **Pause on hover** — auto-dismiss timer pauses when the user hovers over the toast
- **Progress bar** — visual countdown indicator for auto-dismiss duration
- **Animated** — smooth slide-in/slide-out transitions
- **Accessible** — proper ARIA roles (`alert` for errors, `status` for others) and `aria-live` regions
- **Custom icons** — use any HTML string (emoji, SVG, etc.) as the toast icon
- **Custom CSS classes** — apply your own styles or Tailwind classes via the `className` option
- **Dismiss callback** — run logic after a toast is dismissed via `onDismiss`
- **Programmatic control** — create, update, dismiss, and query toasts at runtime
- **Responsive** — full-width toasts on small screens, constrained on larger ones
- **SSR safe** — guards against `window`/`document` access on the server

## Installation

```bash
npm install @arxdn/toast
```

```bash
pnpm add @arxdn/toast
```

```bash
yarn add @arxdn/toast
```

## Quick Start

```typescript
import { toast } from '@arxdn/toast'

toast.success('Operation successful')
toast.error('Something went wrong')
toast.warning('Check your input')
toast.info('New update available')
```

## Usage

### With Options

```typescript
toast.success('Saved!', {
  duration: 5000,
  position: 'bottom-right',
  dismissible: false,
})
```

### Custom Icon

```typescript
toast.info('Uploading...', {
  icon: '🚀',
})

toast.success('Done', {
  icon: '<svg>...</svg>',
})
```

### Dismiss Callback

```typescript
toast.error('Connection lost', {
  onDismiss: instance => {
    console.log(`Toast ${instance.id} was dismissed`)
  },
})
```

### Programmatic Control

```typescript
// Create and store the reference
const t = toast.success('Loading...')

// Update the message
t.update('Almost done...')

// Dismiss it
t.dismiss()

// Or dismiss by ID
toast.dismiss(t.id)

// Dismiss all toasts
toast.dismissAll()

// Get all active toasts
const all = toast.getAll()
```

### Persistent Toast

```typescript
// Set duration to 0 to prevent auto-dismiss
toast.info('This stays until dismissed', {
  duration: 0,
})
```

### Custom Styling

Apply your own CSS classes to any toast:

```typescript
toast.success('Styled!', {
  className: 'my-custom-toast',
})
```

```css
.my-custom-toast {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  font-weight: bold;
}
```

### With Tailwind CSS

Tailwind classes work directly via the `className` option:

```typescript
toast.success('Tailwind toast', {
  className: 'rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-bold',
})
```

The library uses `ui-toast-` prefixed CSS classes internally, so there are no conflicts with Tailwind or other CSS frameworks.

## API

### Methods

| Method                                | Description                          |
| ------------------------------------- | ------------------------------------ |
| `toast.success(message, options?)`    | Create a success toast               |
| `toast.error(message, options?)`      | Create an error toast                |
| `toast.warning(message, options?)`    | Create a warning toast               |
| `toast.info(message, options?)`       | Create an info toast                 |
| `toast.default(message, options?)`    | Create a default toast               |
| `toast.create(message, options?)`     | Create a toast with explicit options |
| `toast.dismiss(id)`                   | Dismiss a toast by ID                |
| `toast.dismissAll()`                  | Dismiss all active toasts            |
| `toast.update(id, message, options?)` | Update an existing toast             |
| `toast.getAll()`                      | Get all active toast instances       |

All create methods return a `ToastInstance` with `id`, `dismiss()`, and `update()`.

### Options

| Option         | Type                                                       | Default       | Description                                    |
| -------------- | ---------------------------------------------------------- | ------------- | ---------------------------------------------- |
| `type`         | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'default'`   | Toast type (sets color and icon)               |
| `position`     | `Position`                                                 | `'top-right'` | Screen position                                |
| `duration`     | `number`                                                   | `3000`        | Auto-dismiss delay in ms (0 = no auto-dismiss) |
| `dismissible`  | `boolean`                                                  | `true`        | Show close button                              |
| `pauseOnHover` | `boolean`                                                  | `true`        | Pause auto-dismiss timer on hover              |
| `className`    | `string`                                                   | `''`          | Custom CSS class(es) to add                    |
| `icon`         | `string`                                                   | `''`          | Custom icon HTML (overrides default)           |
| `onDismiss`    | `(instance: ToastInstance) => void`                        | `undefined`   | Callback fired after dismiss                   |

### Positions

```typescript
import { POSITIONS } from '@arxdn/toast'

toast.info('Hello', { position: POSITIONS.BOTTOM_CENTER })
```

Available: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`

### Advanced Usage

You can also import the class directly for more control:

```typescript
import { ToastManager } from '@arxdn/toast'

const manager = new ToastManager()
manager.create('Hello', { type: 'success' })
```

## Types

Full TypeScript definitions are included. Key types:

```typescript
import type { ToastOptions, ToastInstance, Position, ToastType } from '@arxdn/toast'
```

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Requires `requestAnimationFrame` and `Map` support (available in all browsers since ~2015).

## License

[MIT](./LICENSE)
