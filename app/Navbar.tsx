'use client';
import React from 'react'
import Link from 'next/link'
import {ImBug} from 'react-icons/im';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import {useSession} from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Skeleton from '@/app/components/Skeleton';
import { heightPropDefs } from '@radix-ui/themes/dist/esm/props/height.props.js';

const Navbar = () => { 
  return (
    
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <ImBug href='/'/>
            <NavLinks/>
          </Flex>
          <AuthStatus/>
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues/list'}
    ]
    const currentPath = usePathname();
  return (
    <ul className='flex space-x-6 decoration-0'>
      {links.map((link) =>(
        <li key={link.href}>
          <Link 
              className={classnames(
                {
                  'nav-link': true,
                  '!text-zinc-900': currentPath === link.href,
                }
              )
            }
            href={link.href}
            >
              {link.label}
            </Link>
          </li>
          )
        )
      }
    </ul>
  )

}

const AuthStatus = () => {
  const {status, data:session} = useSession();


  if (status === 'loading') return <Skeleton width='3rem'/>;

  if (status === 'unauthenticated') 
    return <Link className='nav-link' href={'/api/auth/signin'}>Login</Link>

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
          src={session!.user!.image!}
          fallback='?'
          size='2'
          radius='full'
          className='cursor-pointer'
          >
          </Avatar>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Text size='2'>
            {session!.user!.email}
          </Text>
          <Text>
            {session!.user!.name}
          </Text>
          <DropdownMenu.Item>
            <Link href='/api/auth/signout'>Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default Navbar
