'use client'

import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'
import { trackBlogPostViewed } from '@/lib/posthog'
import type { BlogPostViewedEvent } from '@/lib/posthog-events'

interface BlogPostTrackerProps {
  postSlug: string
  postTitle: string
  postTags?: string[]
  readingTime?: number
  postDate?: string
}

export function BlogPostTracker({
  postSlug,
  postTitle,
  postTags,
  readingTime,
  postDate,
}: BlogPostTrackerProps) {
  const posthog = usePostHog()

  useEffect(() => {
    // Track blog post view on mount
    const event: BlogPostViewedEvent = {
      post_slug: postSlug,
      post_title: postTitle,
      post_tags: postTags,
      reading_time: readingTime,
      post_date: postDate,
    }

    trackBlogPostViewed(posthog, event)
  }, [posthog, postSlug, postTitle, postTags, readingTime, postDate])

  return null
}

