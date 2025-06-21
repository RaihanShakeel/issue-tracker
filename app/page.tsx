import Image from 'next/image'
import Pagination from './components/Pagination'
import page from './issues/[id]/page'

export default async function Home({searchParams}: {searchParams: Promise<{page: string}>}) {
  const resolvedParams = await searchParams;
  return (
    <Pagination itemCount={100} pageSize={10} currentPage={parseInt(resolvedParams.page)}/>
  )
}
 