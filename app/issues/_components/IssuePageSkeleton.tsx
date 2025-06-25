'use client';
import { Box } from '@radix-ui/themes';
import Skeleton from "@/app/components/Skeleton";

const IssuePageSkeleton = () => {
  return (
    <Box className='max-w-xl'>
        <form className='space-y-3'>
            <Skeleton height='2rem'/>
            <Skeleton height='24rem' className='mt-2'/>
            <Skeleton width='7rem' height='2rem' className='mt-10'/>
        </form>
    </Box>
  )
}

export default IssuePageSkeleton
