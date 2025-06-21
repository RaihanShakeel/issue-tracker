import { prisma } from '@/prisma/client';
import Pagination from '../components/Pagination';
import { Status } from '../generated/prisma';
import IssueTable, { columnValues, IssueQury } from './_components/IssueTable';
import IssuePageActions from './IssuePageActions';


const IssuesPage = async (
  {searchParams}: 
  {searchParams: Promise<IssueQury>}) => {
  const resolvedParams = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedParams.status)
    ? resolvedParams.status
    : undefined;
  
  const where = {status}

  const orderBy = columnValues.includes(resolvedParams.orderBy)
    ? { [resolvedParams.orderBy]: 'asc' } : undefined;

  const page = parseInt(resolvedParams.page) || 1;
  const pageSize = 10

  const IssueCount = await prisma.issue.count({where});

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page-1) * pageSize,
    take: pageSize
  });
  return (
    <div>
      <IssuePageActions/>
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Pagination pageSize={pageSize} currentPage={page} itemCount={IssueCount}/>
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default IssuesPage