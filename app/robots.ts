'use cache'

import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { cacheLife } from 'next/cache'

// MIGRATED: Removed export const dynamic = 'force-static' (incompatible with Cache Components)
// Using "use cache" with long-term caching for robots.txt (never changes)
// Strategy: cacheLife('max') - Cache indefinitely since robots.txt is static

export default async function robots(): Promise<MetadataRoute.Robots> {
  cacheLife('max')
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
