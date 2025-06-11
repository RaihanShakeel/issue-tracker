'use client';
import React from 'react'
import Link from 'next/link'
import {ImBug} from 'react-icons/im';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';

const Navbar = () => {
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'}
    ]
    const currentPath = usePathname();
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <ImBug href='/'/>
        <ul className='flex space-x-6'>
            {links.map((link) => <Link className={classnames({'text-zinc-500': currentPath !== link.href, 'text-zinc-900': currentPath === link.href, 'hover:text-zinc-800 transition-colors': true})}  key={link.href} href={link.href}>{link.label}</Link>)}
        </ul>
    </nav>
  )
}

export default Navbar
