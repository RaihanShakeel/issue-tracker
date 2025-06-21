import IssueStatusBadge from '@/app/components/IssueStatusBasdge';
import Link from '@/app/components/Link';
import { Issue, Status } from '@/app/generated/prisma';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';

export interface IssueQury{
    status: Status, 
    orderBy: keyof Issue,
    page: string
}

interface Props {
    searchParams: Promise<IssueQury>
    issues: Issue[]
}

const IssueTable = async ({searchParams, issues}: Props) => {
    const resolvedParams = await searchParams;
  return (
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
  )
}

const columns: {label: string, value: keyof Issue, className?: string}[]=[
    {label: 'Issue', value: 'title'},
    {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
    {label: 'CreateAt', value: 'createdAt', className: 'hidden md:table-cell'}
  ]

export const columnValues = columns.map(column => column.value);

export default IssueTable
