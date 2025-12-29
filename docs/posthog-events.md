# PostHog Event Tracking Documentation

This document describes all PostHog events tracked in this application, their properties, and when they are triggered.

## Event Naming Convention

All events use `snake_case` naming with the following prefixes:
- `blog_*` - Blog-related events
- `newsletter_*` - Newsletter subscription events
- `cv_*` - CV download events
- `external_link_*` - External link clicks
- `social_link_*` - Social media link clicks
- `navigation_*` - Navigation events
- `search_*` - Search events
- `header_*` - Header behavior events
- `theme_*` - Theme toggle events

## Standard Event Properties

Most events include:
- `source_page` - The page path where the event occurred (e.g., `/blog/my-post`)
- `timestamp` - ISO 8601 timestamp of when the event occurred

## Events

### Page Views

**Event:** `$pageview` (PostHog standard event)

**Properties:**
- `$current_url` - Full URL including query parameters
- `pathname` - Page pathname
- `search_params` - Query string parameters (if any)
- `timestamp` - ISO 8601 timestamp

**Triggered:** Automatically on every page navigation

---

### Newsletter Events

#### `newsletter_subscribed`

**Properties:**
- `email_hash` - Hashed email address for privacy
- `source` - Page path where subscription occurred
- `timestamp` - ISO 8601 timestamp

**Triggered:** When a user successfully subscribes to the newsletter

#### `newsletter_subscription_failed`

**Properties:**
- `error` - Error message
- `source` - Page path where subscription attempt occurred

**Triggered:** When a newsletter subscription fails

---

### Blog Events

#### `blog_post_viewed`

**Properties:**
- `post_slug` - Blog post slug/identifier
- `post_title` - Blog post title
- `post_tags` - Array of post tags (optional)
- `reading_time` - Estimated reading time in minutes (optional)
- `post_date` - Publication date (optional)
- `source_page` - Page path (automatically added)

**Triggered:** When a blog post page is viewed

#### `blog_post_navigation`

**Properties:**
- `direction` - Either `"prev"` or `"next"`
- `from_slug` - Slug of the current post
- `to_slug` - Slug of the post being navigated to
- `source_page` - Page path (automatically added)

**Triggered:** When user clicks previous/next post navigation (if implemented)

#### `blog_scroll_depth`

**Properties:**
- `post_slug` - Blog post slug
- `depth` - Scroll depth percentage: `25`, `50`, `75`, or `100`
- `source_page` - Page path (automatically added)

**Triggered:** When user scrolls to 25%, 50%, 75%, or 100% of a blog post

#### `blog_reading_time`

**Properties:**
- `post_slug` - Blog post slug
- `reading_time_seconds` - Time spent reading in seconds
- `source_page` - Page path (automatically added)

**Triggered:** When user spends significant time reading a blog post (if implemented)

---

### Download Events

#### `cv_downloaded`

**Properties:**
- `source_page` - Page path where download was initiated
- `timestamp` - ISO 8601 timestamp

**Triggered:** When user clicks the CV download button

---

### Link Events

#### `external_link_clicked`

**Properties:**
- `destination_url` - Full URL of the external link
- `source_page` - Page path where link was clicked

**Triggered:** When user clicks an external link (not internal or anchor links)

#### `social_link_clicked`

**Properties:**
- `platform` - Social platform name (e.g., `"linkedin"`, `"github"`, `"xing"`)
- `destination_url` - Full URL of the social link
- `source_page` - Page path where link was clicked

**Triggered:** When user clicks a social media icon/link

---

### Search Events

#### `search_opened`

**Properties:**
- `source_page` - Page path where search was opened

**Triggered:** When user clicks the search button

#### `search_performed`

**Properties:**
- `query` - Search query string
- `result_count` - Number of results returned (optional)
- `source_page` - Page path (automatically added)

**Triggered:** When user performs a search (if implemented)

---

### Navigation Events

#### `navigation_clicked`

**Properties:**
- `link_text` - Text of the navigation link
- `destination` - Destination path
- `source_page` - Page path where navigation was clicked

**Triggered:** When user clicks a header navigation link

#### `header_scroll_behavior`

**Properties:**
- `action` - Either `"hide"` or `"show"`
- `scroll_position` - Current scroll position in pixels

**Triggered:** When header hides or shows based on scroll direction

---

### Theme Events

#### `theme_toggled`

**Properties:**
- `theme` - New theme: `"light"` or `"dark"`
- `previous_theme` - Previous theme: `"light"` or `"dark"`

**Triggered:** When user toggles between light and dark theme

---

## User Identification

Users are identified in PostHog when they:
1. Subscribe to the newsletter - identified using hashed email address

User identification properties:
- `email_hash` - Hashed email address
- `subscribed_at` - ISO 8601 timestamp of subscription

---

## Internal User Filtering

Internal users (your own visits) are automatically filtered from analytics if:
- Their email domain matches domains in `NEXT_PUBLIC_POSTHOG_INTERNAL_EMAIL_DOMAINS`
- Their IP matches IPs in `NEXT_PUBLIC_POSTHOG_INTERNAL_IPS` (server-side only)

To configure internal user filtering, set environment variables:
```bash
NEXT_PUBLIC_POSTHOG_INTERNAL_EMAIL_DOMAINS=yourdomain.com,example.com
NEXT_PUBLIC_POSTHOG_INTERNAL_IPS=192.168.1.1,10.0.0.1
```

---

## Development Mode

By default, PostHog is disabled in development mode. To enable it:
```bash
NEXT_PUBLIC_POSTHOG_ENABLED_IN_DEV=true
```

When disabled, events are logged to console instead of being sent to PostHog.

---

## Adding New Events

To add a new event:

1. **Define the event type** in `lib/posthog-events.ts`:
```typescript
export interface MyNewEvent {
  property1: string
  property2?: number
}
```

2. **Create a tracking function** in `lib/posthog.ts`:
```typescript
export function trackMyNewEvent(
  posthog: PostHog | null | undefined,
  event: MyNewEvent
): void {
  safeCapture(posthog, 'my_new_event', {
    ...event,
    source_page: getCurrentPagePath(),
  })
}
```

3. **Use the tracking function** in your component:
```typescript
'use client'
import { usePostHog } from 'posthog-js/react'
import { trackMyNewEvent } from '@/lib/posthog'

export function MyComponent() {
  const posthog = usePostHog()
  
  const handleAction = () => {
    trackMyNewEvent(posthog, {
      property1: 'value',
      property2: 123,
    })
  }
  
  return <button onClick={handleAction}>Click me</button>
}
```

4. **Update this documentation** with the new event details.

---

## Privacy Considerations

- Email addresses are hashed before being sent to PostHog
- No personally identifiable information (PII) is tracked without user consent
- Internal users are automatically filtered from analytics
- All tracking respects user privacy preferences

---

## Configuration

### Required Environment Variables

```bash
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Optional Environment Variables

```bash
# Force enable PostHog and log all events to console (for testing/debugging)
# Works in both development and production
# Use this to test PostHog implementation and validate events are firing correctly
NEXT_PUBLIC_POSTHOG_FORCE_ENABLE=true

# Enable PostHog in development (without console logging)
NEXT_PUBLIC_POSTHOG_ENABLED_IN_DEV=true

# Use reverse proxy to avoid ad blockers
NEXT_PUBLIC_POSTHOG_REVERSE_PROXY=/api/posthog

# Disable session recording
NEXT_PUBLIC_POSTHOG_DISABLE_SESSION_RECORDING=true

# Filter internal users
NEXT_PUBLIC_POSTHOG_INTERNAL_EMAIL_DOMAINS=yourdomain.com
NEXT_PUBLIC_POSTHOG_INTERNAL_IPS=192.168.1.1
```

### Testing and Debugging

**Force Enable with Console Logging:**

Set `NEXT_PUBLIC_POSTHOG_FORCE_ENABLE=true` to:
- Enable PostHog even in development mode
- Log all events to the browser console for debugging
- Validate that events are being captured correctly
- Test PostHog implementation in production without affecting normal operation

When this variable is set, you'll see console logs like:
```
[PostHog] Initialized successfully
[PostHog] Event logging enabled - all events will be logged to console
[PostHog] Event captured: { event: 'blog_post_viewed', properties: {...}, timestamp: '...' }
[PostHog] User identified: { distinctId: '...', properties: {...}, timestamp: '...' }
```

This is useful for:
- Testing PostHog setup during development
- Validating event tracking in production (one-time checks)
- Debugging event properties and values
- Ensuring events are firing at the right times

---

## Reverse Proxy Setup

To use the reverse proxy (recommended to avoid ad blockers):

1. Set `NEXT_PUBLIC_POSTHOG_REVERSE_PROXY=/api/posthog` in your `.env`
2. PostHog will automatically use the proxy endpoint
3. The proxy forwards all requests to PostHog while using your domain

---

## Questions or Issues?

If you have questions about PostHog tracking or need to add new events, refer to:
- PostHog documentation: https://posthog.com/docs
- This project's PostHog utilities: `lib/posthog.ts`
- Event type definitions: `lib/posthog-events.ts`

