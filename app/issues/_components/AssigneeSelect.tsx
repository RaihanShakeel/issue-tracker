'use client';
import { Issue, User } from '@/app/generated/prisma';
import { Select } from '@radix-ui/themes'
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import toast, {Toaster} from 'react-hot-toast';
import Skeleton from '@/app/components/Skeleton';


const AssigneeSelect = ({issue}: {issue: Issue}) => {
    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000,
        retry: 3
    });

    if (isLoading) return <Skeleton height='2rem'/>

    if (error) return null;


  return (
    <>
        <Select.Root onValueChange={
            ((userId)=> {
                axios.patch(
                    `/api/issues/${issue.id}`,
                    {assignedToUserId: userId || null}
                ).catch(()=>{
                    toast.error('Changes could not be saved!');
                });
            })
        }
        defaultValue={issue.assignedToUserId || 'unassigned'}
        >
            <Select.Trigger placeholder='select...'>
            </Select.Trigger>
            <Select.Content position='popper'>
                <Select.Group>
                    <Select.Label>
                        Suggestion
                    </Select.Label>
                    <Select.Item value='unassigned'>Unassigned</Select.Item>
                    {users?.map(user =>(
                        <Select.Item key={user.id} value={user.id}>
                            {user.email}
                        </Select.Item>
                        
                    ) )}
                </Select.Group>
            </Select.Content>
        </Select.Root>
        <Toaster/>
    </>
  )
}

export default AssigneeSelect
