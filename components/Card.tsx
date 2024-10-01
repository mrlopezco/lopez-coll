import { map } from 'lodash'
import Image from './Image'
import Link from './Link'
import Twemoji from './Twemoji'

const Card = ({ title, description, tags, imgSrc, href, flags }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      }  shadow-nextjs dark:shadow-nextjs-dark overflow-hidden rounded-md`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-contain object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <div className="mb-3 space-y-2">
          <h2 className="text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <div className="flex items-center space-x-2">
            {flags && map(flags, (flag) => <Twemoji emoji={flag} />)}
            {tags && (
              <div className="flex items-center space-x-4">
                {map(tags, (tag) => (
                  <span className="text-sm font-medium uppercase text-primary-500 dark:text-primary-400">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        {href && (
          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
