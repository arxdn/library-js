import type { LibraryMeta } from '../content/libraries'

interface JsonLdOrganization {
  '@context': string
  '@type': string
  name: string
  url: string
  [key: string]: unknown
}

interface JsonLdSoftware {
  '@context': string
  '@type': string
  name: string
  description: string
  url: string
  [key: string]: unknown
}

export function buildOrganizationSchema(): JsonLdOrganization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ARXDN',
    url: 'https://arxdn.com/libraries',
    logo: 'https://arxdn.com/libraries/favicon.svg',
  }
}

export function buildSoftwareSchema(lib: LibraryMeta): JsonLdSoftware {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: lib.packageName,
    description: lib.description,
    url: `https://arxdn.com/libraries/${lib.slug}`,
    codeRepository: 'https://github.com/arxdn/library-js',
    programmingLanguage: 'TypeScript',
    runtimePlatform: 'JavaScript',
    license: 'https://opensource.org/licenses/MIT',
    author: {
      '@type': 'Organization',
      name: 'ARXDN',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}
