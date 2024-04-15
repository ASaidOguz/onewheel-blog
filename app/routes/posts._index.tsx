
import {  LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { GetPostListings } from "~/models/posts.server";
import { useOptionalAdminUser } from "~/utils";
interface LoaderData {
    posts:Awaited<ReturnType<typeof GetPostListings>>,
    admin:string|undefined
    }

export const loader:LoaderFunction= async()=>{             
 const posts= await GetPostListings()
 const admin=process.env.ADMIN_EMAIL
    return json<LoaderData>({posts,admin})
}

// PostRoute router function of posts...
export default function PostsRoute(){

const {posts,admin}= useLoaderData() as unknown as LoaderData
const adminUser=useOptionalAdminUser(admin)


    return(
        <main>
            <h1>POSTS </h1>
           {adminUser? <Link to="admin" className="text-red-600 underline">
            Admin
            </Link>:null}
            <ul>
           {posts.map((post)=>(
            <li key={post.slug}>
            <Link prefetch="intent" to={post.slug} className="text-blue-600 underline">
            {post.title}  
            </Link>
            </li>
           ))}


            </ul>
        </main>
    );
}