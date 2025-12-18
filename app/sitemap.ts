'use cache'

import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { cacheLife } from 'next/cache'

// MIGRATED: Removed export const dynamic = 'force-static' (incompatible with Cache Components)
// Using "use cache" with time-based revalidation for automatic updates
// Strategy: cacheLife('hours') - Automatically revalidates every few hours to catch new blog posts
// Since you publish 5 times per week, this ensures sitemap stays up-to-date automatically
// Note: new Date() will be captured at cache time and updated on revalidation

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  cacheLife('hours')
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
