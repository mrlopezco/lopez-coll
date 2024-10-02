import siteMetadata from '@/data/siteMetadata'

import { Twemoji } from '@/components/Twemoji'

const Heading = () => {
  return (
    <h1 className="font-medium text-neutral-900 dark:text-neutral-200">
      I'm <span>{siteMetadata.author}</span> - a dedicated{' '}
      <span>Dynamics 365 Senior Solution Architect</span> in{' '}
      <span className="hidden">Ho Chi Minh, VN</span>
      <span className="absolute ml-1.5 inline-flex pt-[3px]">
        <Twemoji emoji="canada-flag" />
      </span>
    </h1>
  )
}

export default Heading
