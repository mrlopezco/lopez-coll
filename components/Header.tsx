'use client'

import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
// Import SVG - works with both webpack (@svgr) and Turbopack
// With webpack: @svgr converts to React component
// With Turbopack: returns object, use as image src
import LogoSvg from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import SectionContainer from './SectionContainer' // Import the SectionContainer
import {
  trackHeaderScrollBehavior,
  trackNavigationClicked,
  getCurrentPagePath,
} from '@/lib/posthog'

const Header = () => {
  const pathname = usePathname()
  const posthog = usePostHog()
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [lastScrollY, setLastScrollY] = useState(0)
  const lastTrackedDirection = useRef<'up' | 'down'>('up')

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset
      let newDirection: 'up' | 'down' = scrollDirection

      if (currentScrollY > lastScrollY) {
        newDirection = 'down'
      } else {
        newDirection = 'up'
      }

      // Track scroll behavior changes only when direction actually changes
      if (newDirection !== lastTrackedDirection.current && newDirection !== scrollDirection) {
        trackHeaderScrollBehavior(posthog, {
          action: newDirection === 'down' ? 'hide' : 'show',
          scroll_position: currentScrollY,
        })
        lastTrackedDirection.current = newDirection
        setScrollDirection(newDirection)
      }

      setLastScrollY(currentScrollY)
    }

    // Throttle scroll events for performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [lastScrollY, scrollDirection, posthog])

  const headerClass = clsx('w-full fixed  z-60 left-0 right-0 transition-top duration-300', {
    'top-0': scrollDirection === 'up',
    '-top-20': scrollDirection === 'down', // Adjust the negative top value as needed
  })

  const innerDivClass =
    'header-child flex items-center justify-between px-4 py-4 bg-white/75 dark:bg-dark/75 supports-backdrop-blur backdrop-blur sm:px-6 rounded-b-2xl shadow-[1px_3px_26px_3px_rgba(0,0,0,0.1)] dark:shadow-[1px_3px_26px_3px_rgba(255,255,255,0.1)]'

  return (
    <header className={headerClass}>
      <SectionContainer>
        <div className={innerDivClass} style={{ padding: '1.5rem 8px 1rem' }}>
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              <div className="mr-3">
                {(() => {
                  // Handle SVG import - works with both @svgr/webpack and Turbopack
                  if (typeof LogoSvg === 'function') {
                    // @svgr/webpack converted it to a component
                    return <LogoSvg />
                  } else if (
                    LogoSvg &&
                    typeof LogoSvg === 'object' &&
                    'default' in LogoSvg &&
                    typeof LogoSvg.default === 'function'
                  ) {
                    // Component wrapped in default export
                    const LogoComponent = LogoSvg.default
                    return <LogoComponent />
                  } else {
                    // Turbopack or other - use as image
                    const logoSrc =
                      typeof LogoSvg === 'string'
                        ? LogoSvg
                        : (LogoSvg as any)?.src || '/data/logo.svg'
                    return <img src={logoSrc} alt="Logo" className="h-8 w-8" />
                  }
                })()}
              </div>
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="group text-lg font-semibold transition duration-300 sm:text-xl">
                  {siteMetadata.headerTitle}
                  <span className="block h-0.5 max-w-0 bg-black transition-all duration-500 group-hover:max-w-[85%] dark:bg-white"></span>
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
          <div className="mr-2 flex items-center space-x-4 leading-5">
            <div className="no-scrollbar hidden max-w-40 items-center overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
              {headerNavLinks
                .filter((link) => link.href !== '/')
                .map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className={clsx(
                      'mx-1 rounded px-2 py-1 font-medium text-gray-900 dark:text-gray-100 sm:px-3 sm:py-2',
                      pathname.startsWith(link.href)
                        ? 'bg-primary-700 transition duration-200 dark:bg-primary-500'
                        : 'transition duration-200 hover:bg-primary-700 dark:hover:bg-primary-500'
                    )}
                    onClick={() => {
                      trackNavigationClicked(posthog, {
                        link_text: link.title,
                        destination: link.href,
                        source_page: getCurrentPagePath(),
                      })
                    }}
                  >
                    {link.title}
                  </Link>
                ))}
            </div>
            <SearchButton />
            <div className="hidden sm:block">
              <ThemeSwitch />
            </div>

            <MobileNav />
          </div>
        </div>
      </SectionContainer>
    </header>
  )
}

export default Header
