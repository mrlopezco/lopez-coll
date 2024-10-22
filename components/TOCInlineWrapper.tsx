import TOCInline from 'pliny/ui/TOCInline'
import { TOCInlineProps } from 'pliny/ui/TOCInline'

interface TOCInlineWrapperProps extends TOCInlineProps {
  summaryClassName?: string
}

const TOCInlineWrapper = ({ summaryClassName, asDisclosure, ...props }: TOCInlineWrapperProps) => {
  return asDisclosure ? (
    <details className="rounded bg-gray-100 pb-2 pl-6 pt-2 dark:bg-[#262626]">
      <summary className="text-xl font-bold dark:text-gray-100">Table of Contents</summary>
      <TOCInline {...props} />
    </details>
  ) : (
    <TOCInline {...props} />
  )
}

export default TOCInlineWrapper
