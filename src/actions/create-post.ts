"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {z} from "zod";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10)
})
//defining error
type createPostFormState = {
  errors:{
    title?:string[],
    content?:string[],
    formError?:string[]
  }
}

export const createPost = async(slug : string ,prevState: createPostFormState, formData: FormData) : Promise<createPostFormState>=>{


  //parsing the schema
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content")
  })

  if(!result.success){
      return {
        errors:result.error.flatten().fieldErrors
      }
  }
  const session = await auth();
  if(!session || !session.user || !session.user.id){
    return {
      errors:{
        formError:['You have to login first!']
      }
    }
  }
  const topic = await prisma.topic.findFirst({
    where:{slug}
  })

  if(!topic ){
    return {
      errors:{
        formError:['Topic not found!']  
      }
    }
  }
  let post : Post
  try {
    post = await prisma.post.create({
      data:{
        title : result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId:topic.id
      }
    })
  } catch (error: unknown) {
    if(error instanceof Error){
      return{
        errors:{
          formError:[error.message]
        }
      }
    }else{
      return{
        errors:{
          formError:["Failed to create a post"]
        }
      }
    }
  }
  revalidatePath(`/topic/${slug}`);  
  redirect(`/topic/${slug}/posts/${post.id}`)
}