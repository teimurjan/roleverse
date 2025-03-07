"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useCreatePost from "@/data/hooks/use-create-post";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  text: z.string({
    required_error: "You need to write at least one word.",
  }),
});

const CreatePostForm = () => {
  const { mutateAsync } = useCreatePost();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync(data.text);
    } catch (_e) {
      toast({
        title: "Something went wrong",
        description: "Try again later, please",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Write a post</CardTitle>
            <CardDescription>
              Get to know the community by sharing a little bit about yourself.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can <span>@mention</span> other users.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" loading={form.formState.isSubmitting}>
              Post
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default CreatePostForm;
