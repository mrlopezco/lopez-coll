/**
 * PostHog Utility Functions
 * Centralized helper functions for PostHog tracking
 */

import type { PostHog } from 'posthog-js'
import type {
  NewsletterSubscribedEvent,
  NewsletterSubscriptionFailedEvent,
  BlogPostViewedEvent,
  BlogPostNavigationEvent,
  BlogScrollDepthEvent,
  BlogReadingTimeEvent,
  CVDownloadedEvent,
  ExternalLinkClickedEvent,
  SocialLinkClickedEvent,
  SearchOpenedEvent,
  SearchPerformedEvent,
  NavigationClickedEvent,
  HeaderScrollBehaviorEvent,
  ThemeToggledEvent,
} from './posthog-events'

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

/**
 * Check if PostHog should be enabled
 * Can be forced enabled via NEXT_PUBLIC_POSTHOG_FORCE_ENABLE for testing
 * In development, also check NEXT_PUBLIC_POSTHOG_ENABLED_IN_DEV
 */
export function shouldEnablePostHog(): boolean {
  // Force enable for testing (works in both dev and production)
  if (process.env.NEXT_PUBLIC_POSTHOG_FORCE_ENABLE === 'true') {
    return true
  }

  // In development, check if explicitly enabled
  if (isDevelopment()) {
    return process.env.NEXT_PUBLIC_POSTHOG_ENABLED_IN_DEV === 'true'
  }

  return true
}

/**
 * Check if PostHog events should be logged to console
 * Enabled when NEXT_PUBLIC_POSTHOG_FORCE_ENABLE is set (for testing/debugging)
 */
export function shouldLogPostHogEvents(): boolean {
  return process.env.NEXT_PUBLIC_POSTHOG_FORCE_ENABLE === 'true'
}

/**
 * Check if user is an internal user (should be filtered from analytics)
 */
export function isInternalUser(): boolean {
  if (typeof window === 'undefined') return false

  // Check for internal email domains
  const internalDomains = process.env.NEXT_PUBLIC_POSTHOG_INTERNAL_EMAIL_DOMAINS?.split(',') || []
  const userEmail = localStorage.getItem('user_email')
  if (userEmail) {
    const emailDomain = userEmail.split('@')[1]
    if (internalDomains.some((domain) => emailDomain === domain.trim())) {
      return true
    }
  }

  // Check for internal IPs (if configured)
  // Note: This is a simple check. For production, consider server-side IP checking
  const internalIPs = process.env.NEXT_PUBLIC_POSTHOG_INTERNAL_IPS?.split(',') || []
  // Client-side IP detection is limited, this is a placeholder
  // Real IP checking should be done server-side

  return false
}

/**
 * Hash email address for privacy
 */
export function hashEmail(email: string): string {
  // Simple hash function - in production, consider using crypto.subtle
  let hash = 0
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36)
}

/**
 * Safely capture PostHog event with error handling
 */
export function safeCapture(
  posthog: PostHog | null | undefined,
  eventName: string,
  properties?: Record<string, any>
): void {
  const shouldLog = shouldLogPostHogEvents()
  const isEnabled = shouldEnablePostHog()

  if (!posthog || !isEnabled) {
    if (shouldLog || isDevelopment()) {
      console.log('[PostHog] Event not captured:', eventName, properties)
    }
    return
  }

  if (isInternalUser()) {
    if (shouldLog || isDevelopment()) {
      console.log('[PostHog] Event filtered (internal user):', eventName, properties)
    }
    return
  }

  try {
    posthog.capture(eventName, properties)

    // Log event to console when force enable is set (for testing/debugging)
    if (shouldLog) {
      console.log('[PostHog] Event captured:', {
        event: eventName,
        properties,
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error('[PostHog] Error capturing event:', eventName, error)
  }
}

/**
 * Safely identify user with PostHog
 */
export function safeIdentify(
  posthog: PostHog | null | undefined,
  distinctId: string,
  properties?: Record<string, any>
): void {
  const shouldLog = shouldLogPostHogEvents()
  const isEnabled = shouldEnablePostHog()

  if (!posthog || !isEnabled) {
    if (shouldLog || isDevelopment()) {
      console.log('[PostHog] Identify not called:', distinctId, properties)
    }
    return
  }

  if (isInternalUser()) {
    if (shouldLog || isDevelopment()) {
      console.log('[PostHog] Identify filtered (internal user):', distinctId, properties)
    }
    return
  }

  try {
    posthog.identify(distinctId, properties)

    // Log identify call to console when force enable is set (for testing/debugging)
    if (shouldLog) {
      console.log('[PostHog] User identified:', {
        distinctId,
        properties,
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error('[PostHog] Error identifying user:', error)
  }
}

/**
 * Get current page URL
 */
export function getCurrentPageUrl(): string {
  if (typeof window === 'undefined') return ''
  return window.location.href
}

/**
 * Get current page path
 */
export function getCurrentPagePath(): string {
  if (typeof window === 'undefined') return ''
  return window.location.pathname
}

// Event tracking helper functions

export function trackNewsletterSubscribed(
  posthog: PostHog | null | undefined,
  event: NewsletterSubscribedEvent
): void {
  safeCapture(posthog, 'newsletter_subscribed', {
    ...event,
    timestamp: event.timestamp || new Date().toISOString(),
  })
}

export function trackNewsletterSubscriptionFailed(
  posthog: PostHog | null | undefined,
  event: NewsletterSubscriptionFailedEvent
): void {
  safeCapture(posthog, 'newsletter_subscription_failed', event)
}

export function trackBlogPostViewed(
  posthog: PostHog | null | undefined,
  event: BlogPostViewedEvent
): void {
  safeCapture(posthog, 'blog_post_viewed', {
    ...event,
    source_page: getCurrentPagePath(),
  })
}

export function trackBlogPostNavigation(
  posthog: PostHog | null | undefined,
  event: BlogPostNavigationEvent
): void {
  safeCapture(posthog, 'blog_post_navigation', {
    ...event,
    source_page: getCurrentPagePath(),
  })
}

export function trackBlogScrollDepth(
  posthog: PostHog | null | undefined,
  event: BlogScrollDepthEvent
): void {
  safeCapture(posthog, 'blog_scroll_depth', {
    ...event,
    source_page: getCurrentPagePath(),
  })
}

export function trackBlogReadingTime(
  posthog: PostHog | null | undefined,
  event: BlogReadingTimeEvent
): void {
  safeCapture(posthog, 'blog_reading_time', {
    ...event,
    source_page: getCurrentPagePath(),
  })
}

export function trackCVDownloaded(
  posthog: PostHog | null | undefined,
  event: CVDownloadedEvent
): void {
  safeCapture(posthog, 'cv_downloaded', event)
}

export function trackExternalLinkClicked(
  posthog: PostHog | null | undefined,
  event: ExternalLinkClickedEvent
): void {
  safeCapture(posthog, 'external_link_clicked', event)
}

export function trackSocialLinkClicked(
  posthog: PostHog | null | undefined,
  event: SocialLinkClickedEvent
): void {
  safeCapture(posthog, 'social_link_clicked', event)
}

export function trackSearchOpened(
  posthog: PostHog | null | undefined,
  event: SearchOpenedEvent
): void {
  safeCapture(posthog, 'search_opened', {
    ...event,
    source_page: getCurrentPagePath(),
  })
}

export function trackSearchPerformed(
  posthog: PostHog | null | undefined,
  event: SearchPerformedEvent
): void {
  safeCapture(posthog, 'search_performed', {
    ...event,
    source_page: getCurrentPagePath(),
  })
}

export function trackNavigationClicked(
  posthog: PostHog | null | undefined,
  event: NavigationClickedEvent
): void {
  safeCapture(posthog, 'navigation_clicked', event)
}

export function trackHeaderScrollBehavior(
  posthog: PostHog | null | undefined,
  event: HeaderScrollBehaviorEvent
): void {
  safeCapture(posthog, 'header_scroll_behavior', event)
}

export function trackThemeToggled(
  posthog: PostHog | null | undefined,
  event: ThemeToggledEvent
): void {
  safeCapture(posthog, 'theme_toggled', event)
}
