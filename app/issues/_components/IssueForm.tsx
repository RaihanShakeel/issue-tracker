'use client';
import ErrorMessage from '@/app/components/ErrorMessage';
import LoadingIndicator from '@/app/components/LoadingIndicator';
import { createIssueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import { Issue } from '../../generated/prisma';

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
                    if(issue){
                        await axios.patch(`/api/issues/${issue?.id}`, data);
                        router.refresh();
                        router.push('/issues/list');
                    }else{
                        await axios.post('/api/issues', data);
                        router.refresh();
                        router.push('/issues/list');
                    }
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
