'use client';
import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder='select...'>
        </Select.Trigger>
        <Select.Content position='popper'>
            <Select.Group>
                <Select.Label>
                    Suggestion
                </Select.Label>
                <Select.Item value='1'>rsyousuf98@gmail.com 1</Select.Item>
                <Select.Item value='1'>rsyousuf98@gmail.com 1</Select.Item>
                <Select.Item value='1'>rsyousuf98@gmail.com 1</Select.Item>
                <Select.Item value='1'>rsyousuf98@gmail.com 1</Select.Item>
                <Select.Item value='1'>rsyousuf98@gmail.com 1</Select.Item>
                <Select.Item value='1'>rsyousuf98@gmail.com 1</Select.Item>
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
