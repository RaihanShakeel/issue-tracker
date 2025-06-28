'use client';
import { createIssueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import dynamic from 'next/dynamic';
import IssuePageSkeleton from '../_components/IssuePageSkeleton';


const IssueForm = dynamic(
    () => import('../_components/IssueForm'),
    {
      ssr: false,
      loading: () => <IssuePageSkeleton/>

    }
    
);

const NewIssuePage = () => {
  return (
    <IssueForm/>
  )
}

export default NewIssuePage
