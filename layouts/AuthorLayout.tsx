'use client'
import { useState } from 'react'
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
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
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
                    I'm also passionate about technology outside of my job. I started a company
                    called Grow Brand, which published articles about indoor plant equipment. This
                    project sparked my interest in web development, and I began learning basic
                    coding in JavaScript, C++, and Python.
                  </p>
                  <p>
                    Another project I'm proud of is{' '}
                    <a
                      href="https://plaza-365.com"
                      className="text-primary-600 hover:text-primary-500 dark:text-primary-500 hover:dark:text-primary-400"
                      target="_blank"
                    >
                      Plaza 365,
                    </a>{' '}
                    a platform that gathers and showcases great content from Microsoft Dynamics
                    experts. This was a dream project for me, and I'm very proud of its success.
                  </p>
                  <p>
                    As I gained more experience, I moved up to a senior finance consultant role in
                    Germany, leading projects across Europe and beyond. This experience helped me
                    move to Canada with Hitachi Solutions, where I took on new challenges as a
                    solution architect.
                  </p>
                  <p>
                    In Canada, I've been leading smaller projects and expanding my skills. Now, I
                    work with not only Microsoft Dynamics ERP but also customer service and field
                    service solutions. My interest in technology goes beyond Microsoft products, and
                    I enjoy helping clients build their technology stacks and improve their business
                    processes.
                  </p>
                  <p>
                    I'm passionate about my work and love leading projects, focusing on teamwork and
                    effective methods to ensure success. It's been an exciting journey, and I'm
                    happy to help clients achieve their goals with technology.
                  </p>
                </div>
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white dark:from-gray-900"></div>
                )}
              </div>
              <button
                className="mt-4 flex w-full items-center justify-center text-primary-500 hover:text-primary-700 focus:outline-none"
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
