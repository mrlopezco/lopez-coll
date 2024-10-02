import clsx from 'clsx'
import Twemoji from '../Twemoji'
// import Image from '../Image'
// import { Minus, Plus } from 'lucide-react'
// import Link from 'next/link'

const EXPERIENCES = [
  {
    org: 'Hitachi Solutions Ltd.',
    start: '2023',
    end: 'Present',
    title: 'Senior Solution Architect',
    workplace: 'Calgary (Canada)',
    country: 'canada',
    // logo: '/static/images/weaverse-logo.png',
    // icon: 'briefcase',
  },
  {
    org: 'Hitachi Solutions Ltd.',
    start: '2021',
    end: '2023',
    title: 'Solution Architect',
    workplace: 'Calgary (Canada)',
    country: 'canada',
    // logo: '/static/images/weaverse-logo.png',
    // icon: 'briefcase',
  },
  {
    org: 'Hitachi Solutions Ltd.',
    start: '2019',
    end: '2021',
    title: 'Lead Senior Consultant',
    workplace: 'Calgary (Canada)',
    country: 'canada',
    // logo: '/static/images/weaverse-logo.png',
    // icon: 'briefcase',
  },
  {
    org: 'Hitachi Solutions Europe',
    start: '2017',
    end: '2019',
    title: 'Lead Senior Consultant',
    workplace: 'Nürnberg (Germany)',
    country: 'germany',
    // logo: '/static/images/weaverse-logo.png',
    // icon: 'briefcase',
  },
  {
    org: 'HSO Enterprise Solutions GmbH',
    start: '2016',
    end: '2017',
    title: 'Finance Consultant',
    workplace: 'Stuttgart (Germany)',
    country: 'germany',
    // logo: '/static/images/weaverse-logo.png',
    // icon: 'briefcase',
  },
  {
    org: 'HSO Enterprise Solutions GmbH',
    start: '2016',
    end: '2016',
    title: 'Junior Finance Consultant',
    workplace: 'Stuttgart (Germany)',
    country: 'germany',
    // logo: '/static/images/weaverse-logo.png',
    // icon: 'briefcase',
  },
]

export default function CareerTimeline() {
  return (
    <ul className="relative m-0 list-none p-0">
      {EXPERIENCES.map((exp, idx) => (
        <li key={`career-${idx}`} className="m-0 p-0">
          <TimelineItem exp={exp} first={idx === 0} last={idx === EXPERIENCES.length - 1} />
        </li>
      ))}
    </ul>
  )
}

function TimelineItem({
  exp,
  last,
  first,
}: {
  exp: (typeof EXPERIENCES)[0]
  first?: boolean
  last?: boolean
}) {
  const { org, title, icon, start, end, workplace, country } = exp
  return (
    <div
      className={clsx(
        'group/timeline-item',
        'relative -mx-3 flex flex-row items-start gap-3 rounded-lg p-3',
        'cursor-pointer bg-transparent transition-colors hover:bg-slate-100 dark:hover:bg-slate-800',
        'before:absolute before:left-9 before:h-full before:w-px before:bg-gray-300',
        first ? 'before:top-15' : last ? 'before:bottom-3' : 'before:top-0'
      )}
    >
      {/* <Image
        src={logo}
        alt={org}
        className="my-0 h-12 w-12 rounded-md object-contain object-center"
        width={200}
        height={200}
      /> */}
      <details className="w-full [&_.minus]:open:block [&_.plus]:open:hidden">
        <summary className="relative px-10 marker:content-none">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div className="line-clamp-1 text-xs tabular-nums text-gray-500 dark:text-gray-400">
                <span>{start}</span> – <span>{end}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                <Twemoji emoji={`${country.toLowerCase()}-flag`} />
                <span>{workplace}</span>
              </div>
            </div>
            <p className="text-md my-0 font-semibold text-gray-900 dark:text-white">{org}</p>
            <div className="flex flex-wrap items-center gap-1 pt-1 text-sm text-gray-700 dark:text-gray-200">
              {/* <Twemoji emoji={icon} className="!-mt-1" /> */}
              <span>{title}</span>
            </div>
          </div>
        </summary>
      </details>
    </div>
  )
}
