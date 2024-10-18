import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mb-8 mt-16 flex flex-col items-center md:flex-row md:justify-between">
        <div className="mb-3 flex space-x-2">
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
          <SocialIcon kind="xing" href={siteMetadata.xing} />
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )
}
