"use client"

import { useUser } from '@/context/context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, loading } = useUser();  // Destructure loading from context
  const router = useRouter();

  useEffect(() => {
    if (!loading && user === null) {
      // Wait until loading is false, then redirect if user is not found
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;  // Render loading state until data is fetched
  }

  return (
    <div>
      <h1>Hello, {user ? user.name : 'Guest'}</h1>
    </div>
  );
}
