'use client';
import { Issue, User } from '@/app/generated/prisma';
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import toast, {Toaster} from 'react-hot-toast';


const AssigneeSelect = ({issue}: {issue: Issue}) => {
    const [users, setUsers] = useState<User []>([]);

    useEffect(()=> {
        const fetchUsers = async () =>{
            const {data} = await axios.get<User []>('/api/users');
            setUsers(data);
        }
        fetchUsers();
    }, [])

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
                    {users.map(user =>(
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
