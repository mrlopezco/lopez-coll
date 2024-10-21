import TOCInline from 'pliny/ui/TOCInline'
import { TOCInlineProps } from 'pliny/ui/TOCInline'

interface TOCInlineWrapperProps extends TOCInlineProps {
  summaryClassName?: string
}

const TOCInlineWrapper = ({ summaryClassName, asDisclosure, ...props }: TOCInlineWrapperProps) => {
  const detailsStyle = {
    backgroundColor: '#f5f5f5', // Slight greyish background
    paddingLeft: '1.5rem',
    paddingBottom: '0.5rem',
    paddingTop: '0.5rem',
    borderRadius: '.25rem',
  }

  const summaryStyle = {
    fontSize: '1.25em', // Font size for the summary text
    fontWeight: 'bold',
  }

  return asDisclosure ? (
    <details style={detailsStyle} open={!props.collapse}>
      <summary style={summaryStyle}>Table of Contents</summary>
      <TOCInline {...props} />
    </details>
  ) : (
    <TOCInline {...props} />
  )
}

export default TOCInlineWrapper
