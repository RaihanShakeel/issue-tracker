import IssueStatusBadge from '@/app/components/IssueStatusBasdge'
import { prisma } from '@/prisma/client'
import { Card, Flex, Heading , Text} from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkDown from 'react-markdown';

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

    return (
    <div>
        <Heading>{issue.title}</Heading>
        <Flex className='space-x-3' my={'3'}>
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='!prose !lg:prose-xl'>
            <ReactMarkDown>{issue.description}</ReactMarkDown>
        </Card>
    </div>
  )
}
