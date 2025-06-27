import Image from 'next/image'
import Pagination from './components/Pagination'
import page from './issues/[id]/page'
import LatestIssue from './LatestIssue'

export default function Home() {
  return (
    <LatestIssue/>
  )
}
 