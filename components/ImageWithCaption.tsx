import clsx from 'clsx'

const basePath = process.env.BASE_PATH

type Props = {
  src: string
  alt: string
  caption: string
  className?: string
}

const ImageWithCaption = ({ src, alt, caption, className }: Props) => (
  <figure className={clsx('text-center', className)}>
    <img src={`${basePath || ''}${src}`} alt={alt} className="mx-auto" />
    <figcaption>{caption}</figcaption>
  </figure>
)

export default ImageWithCaption
