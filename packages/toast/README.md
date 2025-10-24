# @arxdn/toast

Modern and customizable toast notification system.

## Installation

```bash
npm install @arxdn/toast
```

## Basic Usage

```typescript
import { toast } from '@arxdn/toast'

// Toast types
toast.success('Operation successful')
toast.error('An error occurred')
toast.warning('Warning')
toast.info('Information')
toast.default('Simple message')

// Custom options
toast.success('Custom title', {
  duration: 5000,
  position: 'top-right',
})
```

## Custom Styling

You can apply your own CSS by adding a custom className:

```typescript
toast.success('Custom styled toast', {
  className: 'my-custom-toast',
})
```

Then in your CSS:

```css
.my-custom-toast {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 12px;
  color: white;
  font-weight: bold;
}
```

## API

### Main Methods

- `toast.success(message, options?)`
- `toast.error(message, options?)`
- `toast.warning(message, options?)`
- `toast.info(message, options?)`
- `toast.default(message, options?)`
- `toast.create(message, options)`
- `toast.dismiss(id)`
- `toast.dismissAll()`
- `toast.update(id, options)`
- `toast.getAll()`

### Options

```typescript
interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info' | 'default'
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  duration?: number
  dismissible?: boolean
  className?: string // Custom CSS class
  // ... more options
}
```

## License

MIT
