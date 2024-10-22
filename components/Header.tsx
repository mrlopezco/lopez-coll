'use client'

import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import SectionContainer from './SectionContainer' // Import the SectionContainer

const Header = () => {
  const pathname = usePathname()
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

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
                <Logo />
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
                        ? 'bg-primary-700 dark:bg-primary-500'
                        : 'hover:bg-primary-700 dark:hover:bg-primary-500'
                    )}
                  >
                    {link.title}
                  </Link>
                ))}
            </div>
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </SectionContainer>
    </header>
  )
}

export default Header
