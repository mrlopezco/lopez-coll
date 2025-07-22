import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <h2 className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            This is a selection of the h2rojects I have been involved in. Some smaller assignments
            or pre-sale projects are not being included in this list.
          </h2>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d, idx) => (
              <Card
                key={`project-${idx}`}
                title={d.title}
                description={d.description}
                tags={d.tags}
                imgSrc={d.imgSrc}
                href={d.href}
                flags={d.flags}
                role={d.role}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
