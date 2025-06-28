import authOptions from '@/app/auth/Options'
import IssueStatusBadge from '@/app/components/IssueStatusBasdge'
import { prisma } from '@/prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkDown from 'react-markdown'
import AssigneeSelect from '../_components/AssigneeSelect'
import DeleteIssueButton from '../_components/DeleteIssueButton'
import { title } from 'process'

interface Props{
    params: Promise<{id: string}>;
}

export default async function  ({params}: Props) {
    const session = await getServerSession(authOptions);

    const resolveParams = await params;
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(resolveParams.id)
        }
    })

    if (!issue) notFound();
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
        {session && <Box>
            <Flex direction={'column'} gap={'4'}>
                <AssigneeSelect issue={issue}/>
                <Button>
                    <Pencil2Icon/>
                    <Link href={`/issues/edit/${issue.id}`}>Edit Issue</Link>
                </Button>
                <DeleteIssueButton issueId={issue.id}/>
                
            </Flex>
        </Box>}
    </Grid>
  )
}


export async function generateMetadata({params}: Props){
    const resolvedParams = await params;
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(resolvedParams.id)}
    });

    return {
        title: issue?.title,
        description: 'Details of issue' + issue?.id
    }

}
