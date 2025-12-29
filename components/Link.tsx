/* eslint-disable jsx-a11y/anchor-has-content */
'use client'

import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import { usePostHog } from 'posthog-js/react'
import { trackExternalLinkClicked, getCurrentPagePath } from '@/lib/posthog'

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const posthog = usePostHog()
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  const handleExternalClick = () => {
    if (href && !isInternalLink && !isAnchorLink) {
      trackExternalLinkClicked(posthog, {
        destination_url: href.toString(),
        source_page: getCurrentPagePath(),
      })
    }
  }

  if (isInternalLink) {
    return <Link className="break-words" href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a className="break-words" href={href} {...rest} />
  }

  return (
    <a
      className="break-words"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      onClick={handleExternalClick}
      {...rest}
    />
  )
}

export default CustomLink
