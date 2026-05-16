'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from '@/components/Image'
import Link from '@/components/Link'
import type { CoreContent } from 'pliny/utils/contentlayer.js'
import type { Authors } from 'contentlayer/generated'

interface LinkedInFollowModalProps {
  authorDetails: CoreContent<Authors>[]
  scrollThreshold?: number
}

const STORAGE_KEY = 'linkedin-modal-dismissed'

export default function LinkedInFollowModal({
  authorDetails,
  scrollThreshold = 0.8,
}: LinkedInFollowModalProps) {
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const tickingRef = useRef(false)
  const scrollHandlerRef = useRef<(() => void) | null>(null)

  // Get the first author with LinkedIn follow URL (usually there's only one)
  const author = authorDetails.find((a) => a.linkedinfollow) || authorDetails[0]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only show on blog article pages
    if (!pathname.startsWith('/blog/') || pathname === '/blog') {
      return
    }

    // Check if modal has been dismissed in this session
    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem(STORAGE_KEY) === 'true'
      if (dismissed) {
        return
      }
    }

    const handleScroll = () => {
      // Check again in case it was dismissed
      if (typeof window !== 'undefined') {
        const dismissed = sessionStorage.getItem(STORAGE_KEY) === 'true'
        if (dismissed) {
          return
        }
      }

      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      const scrollPercentage = (scrollY + windowHeight) / documentHeight

      if (scrollPercentage >= scrollThreshold && !showModal) {
        setShowModal(true)
      }
    }

    // Throttle scroll events for performance
    const throttledHandleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          handleScroll()
          tickingRef.current = false
        })
        tickingRef.current = true
      }
    }

    // Store handler in ref for cleanup
    scrollHandlerRef.current = throttledHandleScroll

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })

    return () => {
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current)
      }
      tickingRef.current = false
    }
  }, [pathname, scrollThreshold, showModal])

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    }
    setShowModal(false)
  }

  // Don't render if not mounted, not on blog article, or no LinkedIn follow URL
  if (
    !mounted ||
    !pathname.startsWith('/blog/') ||
    pathname === '/blog' ||
    !author?.linkedinfollow
  ) {
    return null
  }

  return (
    <Transition appear show={showModal} as={Fragment} unmount={false}>
      <Dialog as="div" onClose={handleDismiss} unmount={false} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          unmount={false}
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            unmount={false}
          >
            <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-950">
              {/* Close button */}
              <button
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                onClick={handleDismiss}
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="flex flex-col items-center space-y-4 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Thank you for reading!
                </h2>

                {author.avatar && (
                  <div className="flex-shrink-0">
                    <Image
                      src={author.avatar}
                      width={80}
                      height={80}
                      alt={author.name || 'Author'}
                      className="h-20 w-20 rounded-full"
                    />
                  </div>
                )}

                <p className="text-gray-700 dark:text-gray-300">
                  If you enjoyed this article, consider following me on LinkedIn for more insights
                  on Dynamics 365 and ERP implementations.
                </p>

                <Link
                  href={author.linkedinfollow}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-white transition-all duration-300 hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Follow on LinkedIn
                </Link>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
