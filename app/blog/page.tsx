import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 7

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <>
      <div className=" divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Blog
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            My name is Ignacio Lopez Coll, and I am a Microsoft Dynamics 365 Solution Architect with
            a strong financial background. As a former financial consultant, I frequently write
            about Dynamics 365 Finance. However, my enthusiasm for discovering new topics and
            delving into the wider Microsoft Dynamics stack means you'll also find articles on
            project management, methodologies, and other Dynamics 365 applications like Supply Chain
            Management, Dual Write, and Power Automate. <br /> Please note that this is my personal
            blog, and all opinions expressed are solely my own.
          </p>
        </div>
        <div>
          <ListLayout
            posts={posts}
            initialDisplayPosts={initialDisplayPosts}
            pagination={pagination}
          />
        </div>
      </div>
    </>
  )
}
