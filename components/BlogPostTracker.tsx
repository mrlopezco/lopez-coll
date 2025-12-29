'use client'

import { useEffect, useRef } from 'react'
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
  const trackedSlugRef = useRef<string | null>(null)

  useEffect(() => {
    // Prevent duplicate events - only track once per post slug
    // This handles React Strict Mode double-mounting in development
    if (trackedSlugRef.current === postSlug) {
      return
    }

    // Wait for PostHog to be ready
    if (!posthog) {
      return
    }

    // Track blog post view on mount
    const event: BlogPostViewedEvent = {
      post_slug: postSlug,
      post_title: postTitle,
      post_tags: postTags,
      reading_time: readingTime,
      post_date: postDate,
    }

    trackBlogPostViewed(posthog, event)
    trackedSlugRef.current = postSlug
  }, [posthog, postSlug, postTitle, postTags, readingTime, postDate])

  return null
}

