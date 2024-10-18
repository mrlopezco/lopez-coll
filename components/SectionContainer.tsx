import clsx from 'clsx'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function SectionContainer({ children, className }: Props) {
  return (
    <section className={clsx('mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-6xl xl:px-0', className)}>
      {children}
    </section>
  )
}
