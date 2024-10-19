import clsx from 'clsx'
import Image from 'next/image'

const basePath = process.env.BASE_PATH

type Props = {
  src: string
  alt: string
  caption: string
  className?: string
}

const ImageWithCaption = ({ src, alt, caption, className }: Props) => {
  const fullSrc = `${basePath || ''}${src}`

  return (
    <figure className={clsx('text-center', className)}>
      <Image
        src={fullSrc}
        alt={alt}
        className="mx-auto"
        layout="responsive"
        width={700}
        height={475}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default ImageWithCaption
