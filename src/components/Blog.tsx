import React, { useEffect, useState } from 'react'

type blog = {
    userId: string;
    _id: string;
    title: string;
    content: string;
}

function Blog({user}: {user: {email:string, role:string, id:string}}) {
    const [blog, setblog] = useState<blog[]>([]);

    useEffect(() => {
        if (user) {
            
            async function getBlog() {
                const response = await fetch('http://localhost:5000/api/blog/blog', {
                    method: 'GET',
                    credentials: 'include',
                });
                
                const blogs = await response.json();
                
                setblog(blogs);
            }
            getBlog();
        }
    }, [user])


    return (
        <div className='flex gap-3'>
            {blog && blog.map((blog: blog) => (
                <div key={blog._id} className='border p-8 w-[500px]'>
                    <h1>{blog.title}</h1>
                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    )
}

export default Blog
