'use client';
import React, {useState} from 'react'
import { Button, AlertDialog, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoadingIndicator from '@/app/components/LoadingIndicator';
import { Island_Moments } from 'next/font/google';

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={isLoading}>Delete Issue {isLoading && <LoadingIndicator/>}</Button>
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
                  setLoading(true);
                  await axios.delete(`/api/issues/${issueId}`);
                  router.push('/issues/list');
                  router.refresh();  
                } catch (error) {
                  setLoading(false);
                  setError(true);
                }
                finally{
                  setLoading(false);
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
