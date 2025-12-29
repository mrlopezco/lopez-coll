'use client'

import dynamic from 'next/dynamic'

// Lazy load scroll depth tracker to reduce initial bundle size
const ScrollDepthTracker = dynamic(() => import('./ScrollDepthTracker').then(mod => ({ default: mod.ScrollDepthTracker })), {
  ssr: false,
})

interface ScrollDepthTrackerWrapperProps {
  postSlug: string
}

export function ScrollDepthTrackerWrapper({ postSlug }: ScrollDepthTrackerWrapperProps) {
  return <ScrollDepthTracker postSlug={postSlug} />
}

