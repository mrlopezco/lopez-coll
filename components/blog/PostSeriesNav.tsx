import Link from '@/components/Link'
import { Blog } from 'contentlayer/generated'

interface PostSeriesNavProps {
  seriesName?: string
  currentSequence?: number
  currentSlug: string
  allPosts: Blog[]
}

const PostSeriesNav = ({
  seriesName,
  currentSequence,
  currentSlug,
  allPosts,
}: PostSeriesNavProps) => {
  // Return null if no series is defined
  if (!seriesName) return null

  // Filter posts by series name and sort by sequence
  const seriesPosts = allPosts
    .filter((post) => post.postseries === seriesName)
    .sort((a, b) => (a.postseries_sequence || 0) - (b.postseries_sequence || 0))

  // Return null if only one post in series (no need to show series nav)
  if (seriesPosts.length <= 1) return null

  return (
    <div className="py-2 xl:py-8">
      <h3 className="mb-3 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
        In this post series <br /> <br />
        <span className="underline underline-offset-2">{seriesName}</span>
      </h3>
      <ol className="space-y-2">
        {seriesPosts.map((post, index) => {
          const isCurrentPost = post.slug === currentSlug
          const sequenceNumber = post.postseries_sequence || index + 1

          return (
            <li key={post.slug} className="flex items-start">
              <span className="mr-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {sequenceNumber}.
              </span>
              {isCurrentPost ? (
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {post.title} <span className="text-xs">(current)</span>
                </span>
              ) : (
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-primary-500 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-700 text-sm transition-all duration-300"
                >
                  {post.title}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default PostSeriesNav
