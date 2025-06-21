import Image from 'next/image'
import Pagination from './components/Pagination'
import page from './issues/[id]/page'

export default function Home() {
  return (
    <Pagination itemCount={100} pageSize={10} currentPage={5}/>
  )
}
