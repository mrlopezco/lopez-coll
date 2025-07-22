import { Linkedin, Mail } from 'lucide-react'
import { Github, Facebook, Youtube, Twitter, X, Mastodon, Threads, Instagram, Xing } from './icons'

const components = {
  mail: Mail,
  linkedin: Linkedin,
  xing: Xing,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
  x: X,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

const SocialIcon = ({ kind, href, size = 6 }: SocialIconProps) => {
  if (
    !href ||
    (kind === 'mail' && !/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(href))
  )
    return null

  const SocialSvg = components[kind]

  return (
    <a className="text-sm" target="_blank" rel="noopener noreferrer" href={href}>
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`text-gray-600 transition duration-200 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-500 h-${size} w-${size}`}
        strokeWidth={1}
      />
    </a>
  )
}

export default SocialIcon
