"use client"

import Link from 'next/link'
import React from 'react'
import { useUser } from '@/context/context';

function Navbar() {

  const { user, setUser } = useUser();


  async function logout() {
    const response = await fetch('http://localhost:5000/api/login/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      setUser(null);
    }
  }

  const classname = 'border-2 rounded-md px-3 py-2'
  return (
    <nav className='p-4 space-x-1 flex items-center gap-4'>
      {user ?
        <>
          <h1>email: {user.email}</h1>
          <h1>role: {user.role}</h1>
          <button className={user ? `${classname}` : 'hidden'} onClick={logout}>Logout</button>
        </>
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
