'use client'

import { useEffect, useRef } from 'react'
import { usePostHog } from 'posthog-js/react'
import { trackBlogScrollDepth } from '@/lib/posthog'
import type { BlogScrollDepthEvent } from '@/lib/posthog-events'

interface ScrollDepthTrackerProps {
  postSlug: string
}

export function ScrollDepthTracker({ postSlug }: ScrollDepthTrackerProps) {
  const posthog = usePostHog()
  const trackedDepths = useRef<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100)

      // Track at 25%, 50%, 75%, and 100%
      const milestones = [25, 50, 75, 100]
      const reachedMilestone = milestones.find(
        (milestone) => scrollPercentage >= milestone && !trackedDepths.current.has(milestone)
      )

      if (reachedMilestone) {
        trackedDepths.current.add(reachedMilestone)
        const event: BlogScrollDepthEvent = {
          post_slug: postSlug,
          depth: reachedMilestone as 25 | 50 | 75 | 100,
        }
        trackBlogScrollDepth(posthog, event)
      }
    }

    // Throttle scroll events for performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [posthog, postSlug])

  return null
}

