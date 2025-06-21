'use client';
import { Status } from '@/app/generated/prisma';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';


const statuses: {label: string, value?: Status} [] = [
    {label: 'All'},
    {label: 'Open',  value: "OPEN"},
    {label: "In-progress", value: 'IN_PROGRESS'},
    {label: "Closed", value: 'CLOSED'}
]

const IssueStatusFilter = () => {
    const router = useRouter();
  return (
    <Select.Root
    onValueChange={(status) => {
        const query = status ? `?status=${status}` : '';
        router.push(`/issues/${query}`);
    }}
    >
        <Select.Trigger placeholder='Filter Issue by status...'/>
        <Select.Content>
            {statuses.map(status => (
                <Select.Item value={status.value || 'All'} key={status.label}>{status.label}</Select.Item>
            ))}
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
