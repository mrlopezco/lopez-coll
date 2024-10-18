import siteMetadata from '@/data/siteMetadata'

import { Twemoji } from '@/components/Twemoji'

const Heading = () => {
  return (
    <h1 className="font-medium text-neutral-900 dark:text-neutral-200">
      I'm <span>{siteMetadata.author}</span> - <span>Senior Solution Architect</span> for business
      applications such as{' '}
    </h1>
  )
}

export default Heading
