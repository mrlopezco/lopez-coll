'use client'

import clsx from 'clsx'
import Twemoji from '@/components/Twemoji'
import { usePostHog } from 'posthog-js/react'
import { trackCVDownloaded, getCurrentPagePath } from '@/lib/posthog'

interface DownloadCVButtonProps {
  href: string
  text: string
}

const DownloadCVButton: React.FC<DownloadCVButtonProps> = ({ href, text }) => {
  const posthog = usePostHog()

  const handleClick = () => {
    trackCVDownloaded(posthog, {
      source_page: getCurrentPagePath(),
      timestamp: new Date().toISOString(),
    })
  }

  return (
    <a
      className={clsx([
        'border border-transparent',
        'bg-primary-500',
        'text-white hover:text-white dark:text-white dark:hover:text-white',
        'focus:shadow-outline-blue focus:outline-none',
        'transition-colors duration-150',
        'text-sm font-medium leading-5',
        'inline rounded-lg px-4 py-2 shadow',
        'inline-flex items-center gap-1 no-underline',
      ])}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      <span>{text}</span>
      <Twemoji emoji="page-facing-up" />
    </a>
  )
}

export default DownloadCVButton
