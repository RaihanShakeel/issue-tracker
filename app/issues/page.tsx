import React from 'react'
import Link from 'next/link';
import { Button } from '@radix-ui/themes';

const IssuesPage = () => {
  return (
    <Button><Link href={"/issues/new"}>Create New Issue</Link></Button>
  )
}

export default IssuesPage
IssuesPage