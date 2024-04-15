

import { Post } from "@prisma/client";

import { prisma } from "~/db.server"


export async function GetPostListings(){
    return prisma.post.findMany({select:{
        slug:true,
        title:true,
    },
})
}
export async function GetPosts(){
    return prisma.post.findMany()
}

export async function GetPost(slug:string){
    return prisma.post.findUnique({
        where:{slug}});
}

export async function CreatePost(post:Pick<Post,"slug"|"title"|"markdown">){
return await prisma.post.create({data:post})
}

export async function UpdatePost(
    slug:string,
    post:Pick<Post,"slug"|"title"|"markdown">){
    
    return await prisma.post.update({data:post,where:{slug}})
    }

export async function deletePost(slug:string){
    return prisma.post.delete({where:{slug}})
}