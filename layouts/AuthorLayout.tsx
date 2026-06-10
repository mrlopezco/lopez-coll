'use client'
import { useState } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import Twemoji from '@/components/Twemoji'
import CareerTimeline from '@/components/author/CareerTimeline'
import clsx from 'clsx'
import DownloadCVButton from '@/components/DownloadCVButton'

interface Props {
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ content }: Props) {
  const { name, avatar, occupation, company, email, linkedin, xing } = content
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0 xl:gap-x-8">
          <div className="flex flex-col items-center space-x-2 pt-8 xl:sticky xl:top-24">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h2 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h2>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            {company && <div className="text-gray-500 dark:text-gray-400">{company}</div>}
            <div className="flex items-center space-x-3 pt-6 text-2xl">
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="xing" href={xing} />
              <SocialIcon kind="mail" href={`mailto:${email}`} />
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none pt-8 pb-8 text-lg xl:col-span-2">
            <div>
              <h3 className="mt-0">
                Hi there <Twemoji emoji="waving hand" />
              </h3>
              <div
                className={`transition-max-height relative duration-700 ease-in-out ${
                  isExpanded ? 'max-h-full' : 'max-h-48'
                } overflow-hidden`}
              >
                <div className={`${isExpanded ? '' : 'fade-out'}`}>
                  <p>
                    I'm <strong>Ignacio</strong>, a Senior Solution Architect for Microsoft Dynamics
                    365. Ever since I finished university, I've been working in the Microsoft
                    Dynamics field. I started as a junior finance consultant, and at first, I found
                    it quite challenging, especially dealing with accounting. <br />
                    But I soon realized that my university studies had prepared me well, and I was
                    able to apply what I had learned to my job.
                  </p>
                  <p>
                    Learning Microsoft Dynamics AX 2012 was a great experience. It was amazing to
                    see such a powerful Microsoft product and an alternative to SAP, which I had
                    used in my first accounting job. Moving from AX 2012 to AX7 and seeing the rise
                    of cloud-based solutions was really exciting.
                  </p>
                  <p>
                    As I gained more experience, I moved up to a senior finance consultant role in
                    Germany, leading projects across Europe and beyond. That path eventually brought
                    me to Canada with Hitachi Solutions, where I took on new challenges as a
                    solution architect.
                  </p>
                  <p>
                    In Canada, I've been leading projects and expanding my skills. Today I work with
                    not only Microsoft Dynamics ERP but also customer service and field service
                    solutions. My interest in technology goes beyond Microsoft products, and I enjoy
                    helping clients build their technology stacks and improve their business
                    processes.
                  </p>
                  <p>
                    After settling in Canada, I also poured energy into side projects outside my day
                    job. I started Grow Brand, which published articles about indoor plant
                    equipment. That work sparked my interest in web development, and I began
                    learning to code in JavaScript, C++, and Python.
                  </p>
                  <p>
                    Two passion projects I'm especially proud of from that period are Plaza 365, a
                    platform that gathered and showcased great content from Microsoft Dynamics
                    experts, and BiziApps, which tracks job opportunities in the Microsoft Business
                    Applications space. Both are retired now, but the experience I gained from them
                    is still very valuable and applicable to my current role.
                  </p>
                  <p>
                    Lately I'm very focused on AI for customers, implementing Microsoft Copilot
                    Studio and Azure AI Foundry solutions, and using AI to optimize business
                    processes. That includes hands-on work with custom MCP servers and RAG-based
                    memory so agents and copilots stay grounded in the right context.
                  </p>
                  <p>
                    I also love strengthening our consulting practice: methodology, delivery, and
                    how we run engagements internally. Bringing AI into those practices is something
                    I care about a lot.
                  </p>
                </div>
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white dark:from-gray-900"></div>
                )}
              </div>
              <button
                className="text-primary-500 hover:text-primary-700 mt-4 flex w-full items-center justify-center focus:outline-none"
                onClick={toggleExpand}
              >
                {isExpanded ? 'Show Less' : 'Read More'}
                <span
                  className={`ml-2 transform ${isExpanded ? 'rotate-180' : ''} transition-transform`}
                >
                  ▼
                </span>
              </button>
            </div>
            <div>
              <div className="mt-[2em] mb-[1em] flex items-center justify-between [&>h2]:my-0">
                <h2>My career</h2>
                <DownloadCVButton href="/static/CV-Ignacio-LopezColl.pdf" text="Download CV" />
              </div>
              <CareerTimeline />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .fade-out-container {
          position: relative;
          max-height: 12em;
          overflow: hidden;
        }
        .fade-out {
          position: relative;
        }
        .fade-out::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4em;
          background: linear-gradient(to top, white, transparent);
        }
        .transition-max-height {
          transition: max-height 0.7s ease-in-out;
        }
      `}</style>
    </>
  )
}
