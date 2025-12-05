import { slug } from 'github-slugger'
import Tag from './Tag'

interface SeriesTagProps {
  seriesName?: string
}

const SeriesTag = ({ seriesName }: SeriesTagProps) => {
  if (!seriesName) return null

  return <Tag text={seriesName} variant="series" />
}

export default SeriesTag
