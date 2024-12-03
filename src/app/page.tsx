'use client';

import Blog from "@/components/Blog";
import { useUser } from "@/context/context";
import { redirect } from "next/navigation";

export default function Home() {
  const { user, isloading } = useUser();
  
  if (isloading) {
    return <h1>loading...</h1>   
  }

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      {user && <Blog user={user}/>}
    </div>
  );
}
