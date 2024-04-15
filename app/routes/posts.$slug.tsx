import { Post } from "@prisma/client";
import { LoaderFunction,json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import{marked} from "marked"
import invariant from "tiny-invariant";

import { GetPost } from "~/models/posts.server";

interface LoaderData {
  post:Post,
  html: string|Promise<string>,
}
export const loader:LoaderFunction= async({params})=>{
  const{slug}=params;
  invariant(slug,"slug's required")
  const post=await GetPost(slug);

  invariant(post,`post not found ${slug}`);
  const html=marked(post.markdown)
  return json<LoaderData>({post,html})
}
export default function PostSlug() {

  const{post,html}=useLoaderData() as unknown as LoaderData;
    return (
      <main className="mx-auto max-w-4xl">
        <h1 className="my-6 border-b-2 text-center text-3xl">
          {post.slug}
        </h1>
        <div dangerouslySetInnerHTML={{__html:html}}>
        
        </div>
      </main>
    );
  }