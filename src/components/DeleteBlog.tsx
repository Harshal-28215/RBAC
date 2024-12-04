import React from 'react'
import { Button } from './ui/button'
import { useUser } from '@/context/context';
import { hasPermission, Role } from '@/utils/Roles';

type blog = {
  userId: string;
  _id: string;
  title: string;
  content: string;
}

function DeleteBlog({ blog }: { blog: blog }) {
  

  const { user } = useUser();
  const userRole = user?.role;

  async function deleteBlog() {
    try {
      const response = await fetch(`http://localhost:5000/api/blog/blog/${blog._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const permission = userRole && hasPermission(userRole as Role, 'delete') || hasPermission(userRole as Role, 'deleteOwn') && (user?.id == blog.userId) 

  return (
    <>
      {permission &&
        <Button variant="destructive" onClick={deleteBlog}>Delete</Button>
      }
    </>
  )
}

export default DeleteBlog
