import React from 'react'
import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';

interface Props {
    href: string;
    children: string;
}
const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} className='text-violet-500 hover:underline'>
        {children}
    </NextLink>
  )
}

export default Link
