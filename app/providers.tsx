'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect, useState } from 'react'
import { shouldEnablePostHog } from '@/lib/posthog'

export function PHProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Skip initialization if PostHog should be disabled
    if (!shouldEnablePostHog()) {
      const shouldLog = process.env.NEXT_PUBLIC_POSTHOG_FORCE_ENABLE === 'true'
      if (shouldLog || process.env.NODE_ENV === 'development') {
        console.log('[PostHog] Disabled in development mode')
      }
      return
    }

    // Check for required environment variables
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST
    const shouldLog = process.env.NEXT_PUBLIC_POSTHOG_FORCE_ENABLE === 'true'

    if (!posthogKey || !posthogHost) {
      const errorMsg =
        '[PostHog] Environment variables are missing. Required: NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST'
      if (shouldLog) {
        console.error(errorMsg, {
          hasKey: !!posthogKey,
          hasHost: !!posthogHost,
          keyLength: posthogKey?.length || 0,
          hostValue: posthogHost || 'undefined',
        })
      } else {
        console.error(errorMsg)
      }
      return
    }

    try {
      // Determine API host (use reverse proxy if configured, otherwise direct)
      const reverseProxy = process.env.NEXT_PUBLIC_POSTHOG_REVERSE_PROXY
      const apiHost = reverseProxy ? `${window.location.origin}${reverseProxy}` : posthogHost

      // Initialize PostHog with enhanced configuration
      posthog.init(posthogKey, {
        api_host: apiHost,
        person_profiles: 'identified_only',
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        // Session replay configuration
        session_recording: {
          recordCrossOriginIframes: false,
          maskAllInputs: true, // Privacy: mask all input fields
          maskTextSelector: '[data-ph-mask]', // Allow selective text masking
        },
        // Autocapture configuration - tune to reduce noise
        autocapture: {
          dom_event_allowlist: ['click', 'submit'], // Only capture clicks and form submissions
          url_allowlist: [], // Empty means capture all URLs
          css_selector_allowlist: [], // Empty means capture all selectors
        },
        // Advanced settings
        loaded: (ph) => {
          setIsInitialized(true)
          const shouldLog = process.env.NEXT_PUBLIC_POSTHOG_FORCE_ENABLE === 'true'
          if (shouldLog || process.env.NODE_ENV === 'development') {
            console.log('[PostHog] Initialized successfully')
            if (shouldLog) {
              console.log('[PostHog] Event logging enabled - all events will be logged to console')
            }
          }
        },
        // Disable features that might not be needed
        disable_session_recording:
          process.env.NEXT_PUBLIC_POSTHOG_DISABLE_SESSION_RECORDING === 'true',
        // Capture performance metrics
        capture_performance: true,
        // Opt out of PostHog's automatic feature flags
        advanced_disable_feature_flags_on_first_load: false,
      })
    } catch (error) {
      console.error('[PostHog] Initialization error:', error)
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
