'use client';
import { Button, Callout, TextArea, TextField, Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchemas';
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import dynamic from 'next/dynamic';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor'

// replaced with the zod infer method
// interface IssueForm {
//     title: string;
//     description: string;
// }
type IssueFormData = z.infer<typeof issueSchema>;


const IssueForm = ({issue}: {issue?: Issue}) => {
    //make sure to use the useRouter from next/navigation...not the next/router
    const router = useRouter();
    //using the resolver is how to integrate zod validation with hook forms
    const {register,control,handleSubmit, formState: {errors}} = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });
    const [error, setError] = useState('');    
    const [isSubmitting, setSubmiting] = useState(false);

const onSubmit = handleSubmit(async (data)=> {
    try {
        setSubmiting(true);
        if (issue)
            await axios.patch('/api/issues/'+ issue.id, data);
        else
            await axios.post('/api/issues',data); 

        router.push('/issues');
        router.refresh(); //refreshes browswer window to display client data
    } catch (error) {
        setSubmiting(false);
        setError('An unexpected error occured');
    }
    });


  return (
    <div className='max-w-xl'>
        {error && <Callout.Root color="red" className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
    
    <form 
    className='space-y-3' 
    onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder='title' {...register('title')}>  
        </TextField.Root>
      
        <ErrorMessage>
            {errors.title?.message}
        </ErrorMessage>
        <Controller 
            name='description'
            control={control}
            defaultValue={issue?.descrition}
            render={({field})=>  <SimpleMDE placeholder='Description' {...field}/>}
         />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
            {issue ? 'Update Issue' : 'Submit new issue'}{' '}
            {isSubmitting && <Spinner />}
        </Button>
    </form>
    </div>
  )
}

export default IssueForm


//notes
// I am resgitering title and the description box with the react-hook-form
