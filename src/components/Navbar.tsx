"use client"

import { useUser } from '@/context/context'
import Link from 'next/link'
import React from 'react'

function Navbar() {

    const context = useUser();
    const { user } = context;

    const classname = 'border-2 rounded-md px-3 py-2'

    async function logout() {
        const response = await fetch('http://localhost:5000/api/login/logout', {
          method: 'POST',
          credentials: 'include',
        });
      
        console.log(response);
        

        if (response.ok) {
          console.log('Logged out');
        } else {
          console.error('Logout failed');
        }
      }

    return (
        <nav className='p-4 space-x-1 flex items-center gap-4'>
            {user ?
                <div className='flex gap-3'>
                    <button className={classname} onClick={logout}>Logout</button>
                    <p>email: {user?.email}</p>
                    <p>role:{user?.role}</p>
                </div>
                :
                <>
                    <Link href='/login' className={classname}>Login</Link>
                    <Link href='/signup' className={classname}>Signup</Link>
                </>

            }

        </nav>
    )
}

export default Navbar
