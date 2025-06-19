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

const Navbar = () => {
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'}
    ]
    const currentPath = usePathname();
    const {status, data:session} = useSession();
  return (
    
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <ImBug href='/'/>
            <ul className='flex space-x-6 decoration-0'>
                {links.map((link) =>(
                  <li key={link.href}>
                    <Link 
                        className={classnames(
                          {
                            'text-zinc-500': currentPath !== link.href,
                            'text-zinc-900': currentPath === link.href,
                            'hover:text-zinc-800 transition-colors': true
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
          </Flex>
          <Box>
          {status === 'authenticated'
            ? <DropdownMenu.Root>
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
            : <Link href={'/api/auth/signin'}>Login</Link>
          }
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default Navbar
