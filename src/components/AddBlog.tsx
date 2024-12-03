"use client"

import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  PasswordInput
} from "@/components/ui/password-input"
import { useRouter } from 'next/navigation';
import { useUser } from "@/context/context"

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export default function BlogForm() {
  const { user } = useUser();

  const router = useRouter();

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })

 async function onSubmit(values: z.infer < typeof formSchema > ) {

  const data = {
    title: values.title,
    content: values.content,
    id: user?.id
  }

    try {
      const response = await fetch("http://localhost:5000/api/blog/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials:'include',
      });

      const blog = await response.json();
       console.log(blog);
       

      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input 
                placeholder="title"
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>content</FormLabel>
              <FormControl>
              <Input 
                placeholder="content"
                
                type="text"
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}