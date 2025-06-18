import { prisma } from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '../components/IssueStatusBasdge';
import Link from '../components/Link';

import IssuePageActions from './IssuePageActions';

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <IssuePageActions/>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.RowHeaderCell>Issues</Table.RowHeaderCell>
            <Table.RowHeaderCell className='hidden md:table-cell'>Status</Table.RowHeaderCell>
            <Table.RowHeaderCell className='hidden md:table-cell'>Created</Table.RowHeaderCell>
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

export default IssuesPage