import TOCInlineWrapper from './TOCInlineWrapper'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import Twemoji from './Twemoji'
import ImageWithCaption from './ImageWithCaption'
import ImageWithLightBox from './ImageWithLightBox'

export const components: MDXComponents = {
  Image,
  ImageWithCaption,
  ImageWithLightBox,
  TOCInline: TOCInlineWrapper,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  Twemoji,
}
