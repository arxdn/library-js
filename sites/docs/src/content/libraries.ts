interface LibraryMeta {
  name: string
  slug: string
  packageName: string
  description: string
  shortDescription: string
  keywords: string[]
  ogImage: string
  features: string[]
  version: string
  icon: string
}

export const libraries: LibraryMeta[] = [
  {
    name: 'Toast',
    slug: 'toast',
    packageName: '@arxdn/toast',
    description:
      'Lightweight, customizable toast notification system for JavaScript. Zero dependencies, fully typed, with 6 positions, 5 types, pause-on-hover, progress bars, and custom styling.',
    shortDescription: 'Modern toast notifications for JavaScript',
    keywords: [
      'toast notifications javascript',
      'toast library js',
      'lightweight toast',
      'javascript toast',
      'typescript toast notifications',
      'vanilla js toast',
    ],
    ogImage: '/og/toast.png',
    features: [
      '5 toast types with icons',
      '6 screen positions',
      'Pause on hover',
      'Progress bar animation',
      'Custom CSS classes',
      'Zero dependencies',
      'Full TypeScript support',
      'Accessible (ARIA)',
    ],
    version: '1.1.0',
    icon: '🍞',
  },
]

export type { LibraryMeta }
