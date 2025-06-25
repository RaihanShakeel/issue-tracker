// app/issues/_components/IssueFormWrapper.tsx
'use client';

import dynamic from 'next/dynamic';
import IssuePageSkeleton from './IssuePageSkeleton';
import { Issue } from '../../generated/prisma';

const IssueForm = dynamic(
  () => import('./IssueForm'),
  {
    ssr: false,
    loading: () => <IssuePageSkeleton/>
  }
);

interface IssueFormWrapperProps {
  issue?: Issue;
}

const IssueFormWrapper = ({ issue }: IssueFormWrapperProps) => {
  return <IssueForm issue={issue} />;
};

export default IssueFormWrapper;