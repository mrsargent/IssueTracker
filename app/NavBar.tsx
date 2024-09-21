'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { PiTreeLight } from "react-icons/pi";
import classNames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();
    //console.log(currentPath);

    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'}
    ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><PiTreeLight/></Link>
        <ul className='flex space-x-5'>
            {links.map(link => 
                <Link 
                key={link.href}
                className={ classNames({
                    'text-zinc-300': link.href === currentPath,
                    'text-zinc-500': link.href !== currentPath,
                    'hover:text-zinc-700 transition-colors': true
                })}
                href={link.href}>
                    {link.label}
                </Link> 
            )}
        </ul>
    </nav>
  )
}

export default NavBar