import React from 'react'
import IssueForm from '../../IssueForm'
import {prisma} from '../../../../prisma/client';

const IssueEditPage = async ({params}: {params: Promise<{id: string}>}) => {
    const resolveParams = await params;
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(resolveParams.id)
        }
    })
  return (
    <div>
      <IssueForm issue={issue}/>
    </div>
  )
}

export default IssueEditPage
