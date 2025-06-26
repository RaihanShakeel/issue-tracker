'use client';
import Skeleton from '@/app/components/Skeleton';
import { Box, Card, Flex, Grid } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';

const LoadingIssueDetailPage = () => {
    const {data: session} = useSession();
  return (
    <Grid columns={{initial: '1', sm: '5'}} gap={'5'}>
        <Box className='md:col-span-4'>
            <Skeleton className='max-w-xl'/>
            <Flex className='space-x-3' my={'3'}>
                <Skeleton width='3rem'/>
                <Skeleton width='8rem'/>
            </Flex>
            <Card className='prose lg:prose-xl max-w-full'>
                <Skeleton/>
            </Card>
        </Box>
        {session && <Box>
            <Flex direction={'column'} gap={'4'}>
                <Skeleton width='13rem' height='2rem'/>
                <Skeleton width='13rem' height='2rem'/>
                <Skeleton width='13rem' height='2rem'/>
                
            </Flex>
        </Box>}
    </Grid>
  )
}

export default LoadingIssueDetailPage
