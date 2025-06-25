import IssueStatusBadge from '@/app/components/IssueStatusBasdge'
import { prisma } from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading , Text} from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkDown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import DeleteIssueButton from '../_components/DeleteIssueButton'
import AssigneeSelect from '../_components/AssigneeSelect'
import delay from 'delay';

interface Props{
    params: Promise<{id: string}>;
}

export default async function  ({params}: Props) {
    const resolveParams = await params;
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(resolveParams.id)
        }
    })

    if (!issue) notFound();

    
    await delay(2000);
    return (
    <Grid columns={{initial: '1', sm: '5'}} gap={'5'}>
        <Box className='md:col-span-4'>
            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3' my={'3'}>
                <IssueStatusBadge status={issue.status}/>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose lg:prose-xl max-w-full'>
                <ReactMarkDown>{issue.description}</ReactMarkDown>
            </Card>
        </Box>
        <Box>
            <Flex direction={'column'} gap={'4'}>
                <AssigneeSelect issue={issue}/>
                <Button>
                    <Pencil2Icon/>
                    <Link href={`/issues/edit/${issue.id}`}>Edit Issue</Link>
                </Button>
                <DeleteIssueButton issueId={issue.id}/>
                
            </Flex>
        </Box>
    </Grid>
  )
}
