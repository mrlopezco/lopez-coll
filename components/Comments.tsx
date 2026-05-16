'use client'

import { Comments as CommentsComponent } from 'pliny/comments/index.js'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  if (!siteMetadata.comments?.provider) {
    return null
  }
  return <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
}
