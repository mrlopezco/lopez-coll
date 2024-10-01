import { map } from 'lodash'
import summaryCards from '@/data/summaryCards'

export default function SummaryCards() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 py-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Summary
        </h1>
        <p className="!mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
          A summary of my professional career
        </p>
      </div>

      <div className="popular-tags grid grid-cols-3 gap-4 py-6 xl:grid-cols-6">
        {map(summaryCards, (popularTag) => {
          const { title } = popularTag

          return (
            <div className="flex w-[128px] items-center justify-center space-x-2 rounded-lg bg-gray-200 p-3 dark:bg-gray-800">
              {title}
            </div>
          )
          // return (
          //   <Link key={slug} href={href} className={className}>
          //     <BrandIcon type={iconType} className="h-6 w-6" />
          //     <div className="my-auto text-white">{title}</div>
          //   </Link>
          // )
        })}
      </div>
    </div>
  )
}
