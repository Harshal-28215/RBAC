import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUser } from "@/context/context"
import { hasPermission, Role } from "@/utils/Roles"

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

type blog = {
  userId: string;
  _id: string;
  title: string;
  content: string;
}

function EditBlog({ blog }: { blog: blog }) {

  const {user} = useUser();
  const userRole = user?.role;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blog.title,
      content: blog.content,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const data = {
      title: values.title,
      content: values.content,
    }

    try {
      const response = await fetch(`http://localhost:5000/api/blog/blog/${blog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (response.ok) {
        window.location.reload();
    }
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  const permission = userRole && hasPermission(userRole as Role, 'edit') || (hasPermission(userRole as Role , 'editOwn') && (user?.id == blog.userId))  

  return (

    <Dialog>
      <DialogTrigger asChild>
      {permission && (<Button variant="secondary">Edit Blog</Button>)}

      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[100%] mx-auto py-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"

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
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Content"

                      type="text"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent >
    </Dialog >
  )
}

export default EditBlog
