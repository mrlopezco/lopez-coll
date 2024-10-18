import siteMetadata from '@/data/siteMetadata'

import { Twemoji } from '@/components/Twemoji'

const Heading = () => {
  return (
    <h1 className="font-medium text-neutral-900 dark:text-neutral-200">
      I'm <span>{siteMetadata.author}</span> <br />
      <span>Senior Solution Architect for Dynamics Applications</span>{' '}
    </h1>
  )
}

export default Heading
