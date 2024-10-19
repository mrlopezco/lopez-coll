import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${slug(text)}`} className="my-1 mr-2 text-sm font-medium uppercase">
      <div>
        <div className="group relative inline-block py-1 text-xs">
          <div className="absolute inset-0 flex text-primary-500 transition-colors duration-300 group-hover:text-primary-400 dark:text-primary-400 dark:group-hover:text-primary-300">
            <svg height="100%" viewBox="0 0 50 100">
              <path
                d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
                fill="currentColor"
              ></path>
            </svg>
            <div className="-ml-px h-full flex-grow rounded-md rounded-l-none bg-primary-500 transition-colors duration-300 group-hover:bg-primary-400 dark:bg-primary-400 dark:group-hover:bg-primary-300"></div>
          </div>
          <span className="relative pr-px font-semibold uppercase text-white transition-colors duration-300">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {text.split(' ').join('-')}
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default Tag
