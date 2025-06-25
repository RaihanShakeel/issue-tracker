import React from 'react'
import dynamic from 'next/dynamic';
import {prisma} from '../../../../prisma/client';
import { notFound } from 'next/navigation';
import IssueFormWrapper from '../../_components/IssueFormWrapper';


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
      <IssueFormWrapper issue={issue}/>
    </div>
  )
}

export default IssueEditPage
