'use client';
import React, {useState} from 'react'
import { Button, AlertDialog, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red'>Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue. This action is not reversible.
          </AlertDialog.Description>
          <Flex mt={'5'} gap={'3'}>
            <AlertDialog.Cancel>
              <Button color='gray' variant='soft'>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color='red' variant='solid' onClick={async ()=> {
                try {
                  await axios.delete(`/api/issues/${issueId}`);
                  router.push('/issues');
                  router.refresh();  
                } catch (error) {
                  setError(true);
                }
                }}>Delete</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Unable to Delete the issue. An error occured.
          </AlertDialog.Description>
          <AlertDialog.Action >
            <Button mt='5' color='gray' variant='soft' onClick={() => setError(false)}>Ok</Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton
