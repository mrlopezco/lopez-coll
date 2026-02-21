'use client'

import Link from '@/components/Link'
import { usePostHog } from 'posthog-js/react'
import { trackBlogPostNavigation, getCurrentPagePath } from '@/lib/posthog'
import type { AnchorHTMLAttributes } from 'react'

interface BlogNavigationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  direction: 'prev' | 'next'
  fromSlug: string
  toSlug: string
  children: React.ReactNode
}

export function BlogNavigationLink({
  href,
  direction,
  fromSlug,
  toSlug,
  children,
  ...props
}: BlogNavigationLinkProps) {
  const posthog = usePostHog()

  const handleClick = () => {
    trackBlogPostNavigation(posthog, {
      direction,
      from_slug: fromSlug,
      to_slug: toSlug,
    })
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
