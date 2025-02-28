import { Post } from "@prisma/client"
import { prisma } from "..";

export type PostWithData = Post &{
  Topic:{slug:string};
  _count: {Comment: number}
  User?:{name: string | null}
}

export const fetchPostByTopicSlug = async( slug : string) : Promise<PostWithData[]>=>{
   return prisma.post.findMany({
    where:{
    Topic:{slug}
    },
    include:{
      Topic:{select:{slug:true}},
    _count:{select:{Comment:true}},
    User:{select:{name:true}}
   }
  })
}

export const fetchTopPosts = async() : Promise<PostWithData[]> =>{
return prisma.post.findMany({
  orderBy:[
    { Comment: { _count: 'desc' } },
  ],
  include:{
    Topic:{select:{slug:true}},
    _count:{select:{Comment:true}},
    User:{select:{name:true}}
  },
  take:5
})
}
export const fetchPostBySearch = async(term : string) : Promise<PostWithData[]> =>{
  return prisma.post.findMany({
    include:{
      Topic:{select:{slug: true}},
      _count:{select:{Comment:true}},
      User:{select:{name:true}}
    },
    where:{
      OR:[
        {title:{contains:term}},
        {content:{contains:term}}
      ]
    }
  })
}