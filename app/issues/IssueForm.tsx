"use client";
import { Callout, TextField, Button, Text } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import LoadingIndicator from '@/app/components/LoadingIndicator';
import { Issue } from '../generated/prisma';


type IssueFormSchema = z.infer<typeof createIssueSchema>;

const IssueForm = ({issue} : {issue? : Issue}) => {

    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormSchema>(
        {
            resolver: zodResolver(createIssueSchema)
        }
    );
    const router  = useRouter();
    const [ error, setError ] = useState('');
    const [ isLoading, SetLoading ] = useState(false);
  return (
    <div className='max-w-xl'>
        {
            error && <Callout.Root color='red' className='mb-3'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
        }
        <form className='space-y-3'
            onSubmit={handleSubmit( async (data)=>{
                try {
                    SetLoading(true);
                    await axios.post('http://localhost:3000/api/issues', data);
                    router.push('/issues');
                } catch (error) {
                    SetLoading(false);
                    setError("An unexpected error occured.");
                }finally{
                    SetLoading(false);
                }
            }

            )}
        >
            <TextField.Root placeholder='Title' {...register('title')} defaultValue={issue?.title}/>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller
                name='description'
                control={control}
                render={({field})=> <SimpleMDE placeholder='Description' {...field}/>} 
                defaultValue={issue?.description}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Button disabled={isLoading}>{issue? 'Update Issue' : 'Submit Issue'}{isLoading && <LoadingIndicator/>}</Button>
        </form>
    </div>
  )
}

export default IssueForm
