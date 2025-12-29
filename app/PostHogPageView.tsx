'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'
import { safeCapture } from '@/lib/posthog'

export default function PostHogPageView(): null {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    // Track pageviews with enhanced metadata
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }

      // Enhanced pageview tracking with additional metadata
      safeCapture(posthog, '$pageview', {
        $current_url: url,
        pathname,
        search_params: searchParams.toString() || undefined,
        timestamp: new Date().toISOString(),
      })
    }
  }, [pathname, searchParams, posthog])

  return null
}
