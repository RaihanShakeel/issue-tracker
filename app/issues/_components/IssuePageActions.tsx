import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'

const IssuePageActions = () => {
  return (
    <Flex mb='5' justify='between'>
        <IssueStatusFilter/>
        <Button><Link href={"/issues/new"}>Create New Issue</Link></Button>
    </Flex>
  )
}

export default IssuePageActions
