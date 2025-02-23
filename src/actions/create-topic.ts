"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {z} from "zod";
// Error handling in forms using zod
// making schema using zod

const createTopicSchema = z.object({
  name : z.string().min(3).regex(/^[a-z-]+$/,{message:" Must be lowercase letter without spaces"}),
  description:z.string().min(10)
}) 

type createTopicFormState = {
  errors:{
    name?:string[],
    description?:string[],
    formError?:string[]
  }
}
//kyuki yeh async funtion hai toh iska type Promise hoga
export const createTopics = async(prevState: createTopicFormState,formData : FormData) : Promise<createTopicFormState>=>{
  const name = formData.get("name");
  const description = formData.get("description");

  //ab hme schema ko parse krana hai
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if(!result.success){
    return {
      errors:result.error.flatten().fieldErrors
    }
  }
  const session = await auth();
  if(!session || !session.user){
    return {
      errors:{
        formError:['You have to login first!']
      }
    }
  }
  let topic : Topic;
  try {
    topic = await prisma.topic.create({
      data:{
        slug : result.data.name,
        description: result.data.description
      }
    })
  } catch (error) {
    if(error instanceof Error){
      return{
        errors:{
          formError:[error.message]
        }
      }
    }else{
      return{
        errors:{
          formError:["Something Went Wrong"]
        }
      }
    }
  }
  revalidatePath("/");
  redirect(`/topic/${topic.slug}`)
  
}