'use client'

import { AlgoliaButton } from 'pliny/search/AlgoliaButton.js'
import { KBarButton } from 'pliny/search/KBarButton.js'
import { usePostHog } from 'posthog-js/react'
import siteMetadata from '@/data/siteMetadata'
import { trackSearchOpened, getCurrentPagePath } from '@/lib/posthog'

const SearchButton = () => {
  const posthog = usePostHog()

  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton

    const handleClick = () => {
      trackSearchOpened(posthog, {
        source_page: getCurrentPagePath(),
      })
    }

    return (
      <div onClick={handleClick}>
        <SearchButtonWrapper
          aria-label="Search"
          className="hover:bg-primary-500 dark:hover:bg-primary-500 mr-1 ml-1 h-8 w-8 rounded p-1 sm:ml-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="group-hover:text-primary-700 dark:group-hover:text-primary-500 h-6 w-6 text-gray-900 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </SearchButtonWrapper>
      </div>
    )
  }
}

export default SearchButton
