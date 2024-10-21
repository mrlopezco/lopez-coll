import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import Twemoji from '@/components/Twemoji'
import CareerTimeline from '@/components/author/CareerTimeline'
import clsx from 'clsx'

interface Props {
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ content }: Props) {
  const { name, avatar, occupation, company, email, linkedin, xing } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            A little background on who I am and what I do
          </p>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h2 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h2>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            {company && <div className="text-gray-500 dark:text-gray-400">{company}</div>}
            <div className="flex items-center space-x-3 pt-6 text-2xl">
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="xing" href={xing} />
              <SocialIcon kind="mail" href={`mailto:${email}`} />
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 text-lg dark:prose-invert xl:col-span-2">
            <div>
              <h3 className="mt-0">
                Hi there <Twemoji emoji="waving hand" />
              </h3>
              <p>
                I'm <strong>Ignacio Lopez Coll</strong>, a seasoned Senior Solution Architect in
                Microsoft Dynamics 365.
              </p>
              <p>
                Large international project experience including European, North, and South American
                countries. Strengths include strong listening skills, comprehension of complex
                issues, customer issue resolution, and fulfillment of customer’s business
                requirements.
              </p>
              <p>
                Visualizing the customer's success through issue resolution and process improvement
                are my key priorities and the motivators that drive me. Ensuring finance consistency
                through cross-functional business processes is a key specialty of mine.
              </p>
              <p>
                Lately, my main projects have been the implementation of Dynamics at large scale for
                Enterprise clients, requiring not only Finance & Operations but the entire D365
                Suite, including products like Sales and Field Service.
              </p>
            </div>
            <div>
              <div className="mb-[1em] mt-[2em] flex items-center justify-between [&>h2]:my-0">
                <h2>My career</h2>
                <a
                  className={clsx([
                    'border border-transparent',
                    'bg-primary-500 ',
                    'text-white hover:text-white dark:text-white dark:hover:text-white',
                    'focus:shadow-outline-blue focus:outline-none',
                    'transition-colors duration-150',
                    'text-sm font-medium leading-5',
                    'inline rounded-lg px-4 py-2 shadow',
                    'inline-flex items-center gap-1 no-underline',
                  ])}
                  href="/static/CV-Ignacio-LopezColl.pdf"
                  target="_blank"
                >
                  <span>Download CV</span>
                  <Twemoji emoji="page-facing-up" />
                </a>
              </div>
              <CareerTimeline />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
