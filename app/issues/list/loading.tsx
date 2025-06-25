import { prisma } from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import Skeleton from '@/app/components/Skeleton';
import IssuePageActions from '../_components/IssuePageActions';

const IssuePageLoadingIndicator = async() => {
    const issues = await prisma.issue.findMany();
  return (
    <div>
        <IssuePageActions/>
        <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.RowHeaderCell><Skeleton/></Table.RowHeaderCell>
            <Table.RowHeaderCell className='hidden md:table-cell'><Skeleton/></Table.RowHeaderCell>
            <Table.RowHeaderCell className='hidden md:table-cell'><Skeleton/></Table.RowHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Skeleton/>
                <div className='block md:hidden'>
                  <Skeleton/>
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'><Skeleton/></Table.Cell>
              <Table.Cell className='hidden md:table-cell'><Skeleton/></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuePageLoadingIndicator
