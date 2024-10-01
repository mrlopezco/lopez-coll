import Avatar from '@/components/homepage/Avatar'
import BlogLinks from '@/components/homepage/BlogLinks'
import Greeting from '@/components/homepage/Greeting'
import Heading from '@/components/homepage/Heading'
import ShortDescription from '@/components/homepage/ShortDescription'
import TypedBios from '@/components/homepage/TypedBios'
// import Twemoji from '@/components/Twemoji'

export default async function Page() {
  // const sortedPosts = sortPosts(allBlogs)
  // const posts = allCoreContent(sortedPosts)
  // return <Main posts={posts} />

  return (
    <div className="mt-8 dark:divide-gray-700 md:mt-8">
      <Greeting />
      <div className="flex flex-col gap-x-10 md:my-4 md:pb-8 xl:flex-row">
        <Avatar />
        <div className="my-auto flex flex-col text-lg leading-8 text-gray-600 dark:text-gray-400">
          <Heading />
          <TypedBios />
          <ShortDescription />
          <BlogLinks />
          {/* <p className="flex">
            <span className="mr-2">Happy reading</span>
            <Twemoji emoji="clinking-beer-mugs" />
          </p> */}
        </div>
      </div>
    </div>
  )
}
