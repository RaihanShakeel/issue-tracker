import React from 'react'
import IssueForm from '../../IssueForm'
import {prisma} from '../../../../prisma/client';
import { notFound } from 'next/navigation';

const IssueEditPage = async ({params}: {params: Promise<{id: string}>}) => {
    const resolveParams = await params;
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(resolveParams.id)
        }
    })
    if (!issue) notFound();
  return (
    <div>
      <IssueForm issue={issue}/>
    </div>
  )
}

export default IssueEditPage
