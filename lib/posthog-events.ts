/**
 * PostHog Event Type Definitions
 * Ensures type safety and consistency across all event tracking
 */

export interface NewsletterSubscribedEvent {
  email_hash?: string
  source: string
  timestamp?: string
}

export interface NewsletterSubscriptionFailedEvent {
  error: string
  source: string
}

export interface BlogPostViewedEvent {
  post_slug: string
  post_title: string
  post_tags?: string[]
  reading_time?: number
  post_date?: string
}

export interface BlogPostNavigationEvent {
  direction: 'prev' | 'next'
  from_slug: string
  to_slug: string
}

export interface BlogScrollDepthEvent {
  post_slug: string
  depth: 25 | 50 | 75 | 100
}

export interface BlogReadingTimeEvent {
  post_slug: string
  reading_time_seconds: number
}

export interface CVDownloadedEvent {
  source_page: string
  timestamp: string
}

export interface ExternalLinkClickedEvent {
  destination_url: string
  source_page: string
}

export interface SocialLinkClickedEvent {
  platform: string
  destination_url: string
  source_page: string
}

export interface SearchOpenedEvent {
  source_page: string
}

export interface SearchPerformedEvent {
  query: string
  result_count?: number
}

export interface NavigationClickedEvent {
  link_text: string
  destination: string
  source_page: string
}

export interface HeaderScrollBehaviorEvent {
  action: 'hide' | 'show'
  scroll_position: number
}

export interface ThemeToggledEvent {
  theme: 'light' | 'dark'
  previous_theme: 'light' | 'dark'
}

