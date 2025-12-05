import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
  variant?: 'default' | 'series'
}

const Tag = ({ text, variant = 'default' }: Props) => {
  const colorClasses = {
    default: {
      path: 'text-primary-500 transition-colors duration-300 group-hover:text-primary-600 dark:text-primary-600 dark:group-hover:text-primary-500',
      bg: 'bg-primary-500 transition-colors duration-300 group-hover:bg-primary-600 dark:bg-primary-600 dark:group-hover:bg-primary-500',
    },
    series: {
      path: 'text-blue-500 transition-colors duration-300 group-hover:text-blue-600 dark:text-blue-600 dark:group-hover:text-blue-500',
      bg: 'bg-blue-500 transition-colors duration-300 group-hover:bg-blue-600 dark:bg-blue-600 dark:group-hover:bg-blue-500',
    },
  }

  const colors = colorClasses[variant]

  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="my-1 mr-2 inline-block text-sm font-medium uppercase"
    >
      <div className="group relative inline-block py-1 text-xs">
        <div className="absolute inset-0 flex transition-colors duration-300">
          <svg height="100%" viewBox="0 0 50 100" className="text-white">
            <path
              className={`fill-current ${colors.path}`}
              d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
            ></path>
          </svg>
          <div className={`-ml-px h-full flex-grow rounded-md rounded-l-none ${colors.bg}`}></div>
        </div>
        <span className="relative px-2 font-semibold uppercase text-white">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {text.split(' ').join('-')}
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </span>
      </div>
    </Link>
  )
}

export default Tag
