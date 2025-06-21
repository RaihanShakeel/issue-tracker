import { prisma } from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '../components/IssueStatusBasdge';
import Link from '../components/Link';
import NextLink from 'next/link';

import IssuePageActions from './IssuePageActions';
import { Issue, Status } from '../generated/prisma';
import { ArrowUpIcon } from '@radix-ui/react-icons';



const columns: {label: string, value: keyof Issue, className?: string}[]=[
    {label: 'Issue', value: 'title'},
    {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
    {label: 'CreateAt', value: 'createdAt', className: 'hidden md:table-cell'}
  ]

const IssuesPage = async ({searchParams}: {searchParams: Promise<{status: Status, orderBy: keyof Issue}>}) => {
  const resolvedParams = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedParams.status)
    ? resolvedParams.status
    : undefined;

  const orderBy = columns.map(column => column.value).includes(resolvedParams.orderBy)
    ? { [resolvedParams.orderBy]: 'asc' } : undefined;

  const issues = await prisma.issue.findMany({
    where: {status},
    orderBy
  });
  return (
    <div>
      <IssuePageActions/>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell key={column.label} className={column.className}>
                <NextLink href={{query: {...resolvedParams, orderBy: column.value}}}>{column.label}</NextLink>
                {column.value === resolvedParams.orderBy && <ArrowUpIcon className='inline'/>}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status}/>
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status}/></Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default IssuesPage