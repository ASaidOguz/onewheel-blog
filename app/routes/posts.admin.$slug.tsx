import { Post } from "@prisma/client";
import { ActionFunction,redirect,json, LoaderFunction } from "@remix-run/node";
import { Form, isRouteErrorResponse, useActionData,useLoaderData,useNavigation, useRouteError } from "@remix-run/react";
import invariant from "tiny-invariant";

import { CreatePost, GetPost, UpdatePost, deletePost } from "~/models/posts.server";
import { requireAdminUser } from "~/session.server";

export const loader:LoaderFunction= async ({request,params})=>{
  await requireAdminUser(request)
  if(params.slug=="new"){
    return json({})
  }

  invariant(params.slug!=undefined,"need string!!")
  const post=await GetPost(params.slug)
  if(!post){
    throw new Response('Not Found!',{status:404})
  }
  return json({post})
}
type ActionData={
  title:null|string
  slug:null|string
  markdown:null|string
}| undefined
interface LoaderData {
  post:Post
}
export const action:ActionFunction=async({request,params})=>{
    // add admin priviliege to secure the routes!!
    await requireAdminUser(request)

    const formData=await request.formData()
    const intent=formData.get("intent")

    if(intent==="delete"){
      invariant(params.slug!=undefined,"need string!!")
      await deletePost(params.slug);
      return redirect("/posts/admin/")
    }
    const title=formData.get("title")
    const slug=formData.get("slug")
    const markdown=formData.get("markdown")

    const errors:ActionData={
      title:title?null:"title-needed!",
      slug:slug?null:"slug-needed!",
      markdown:markdown?null:"markdown-needed!"   
    }

    const hasErrors=Object.values(errors).some(errorMessage=>errorMessage)
    if(hasErrors){
      return json<ActionData>(errors)
    }
    //type consistency achieved with tiny-invariant;
    invariant(typeof title==='string',"title-must-be-string")
    invariant(typeof slug==='string',"title-must-be-string")
    invariant(typeof markdown==='string',"title-must-be-string")

    if(params.slug=="new"){
      await CreatePost({title,slug,markdown})
    }else{
      invariant(params.slug!=undefined,"need string!!")
      await UpdatePost(params.slug,{title,slug,markdown})
    }
   
    return redirect("/posts/admin")
}
export default function NewpostRoute(){
    const errors=useActionData() as ActionData;

    const data=useLoaderData() as unknown  as LoaderData
    const transition=useNavigation();
    
    const isNewPost=!data.post
    const isCreating=transition.formData?.get("intent")==="create"
    const isUpdating=transition.formData?.get("intent")==="update"
    const isDeleting=transition.formData?.get("intent")==="delete"


    const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;
    return(
        <Form method="post" key={data.post?.slug ?? "new"}>
          <p>
            <label>
                Post Title:{errors?.title?(<em className="text-red-600">{errors.title}</em>):null}
                <input type="text" name="title" className={inputClassName} defaultValue={data.post?.title}/>
            </label>
          </p>
          <p>
            <label>
                Post Slug:{errors?.slug?(<em className="text-red-600">{errors.slug}</em>):null}
                <input type="text" name="slug" className={inputClassName} defaultValue={data.post?.slug}/>
            </label>
          </p>
          <p>
            <label htmlFor="markdown"> MarkDown:{errors?.markdown?(<em className="text-red-600">{errors.markdown}</em>):null}
            </label>
            <textarea 
                  id="markdown"
                  rows={20}
                  name="markdown"
                  className={`${inputClassName} font-mono`}
                  defaultValue={data.post?.markdown}
                  />
          </p>
          <div className="flex justify-end gap-4">
            {isNewPost?null:
               <button type="submit"
               name="intent"
               value="delete"
               className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
               disabled={isDeleting}>
               {isDeleting ? "Deleting..." : "Delete"}
             
               </button>}
            <button type="submit"
                    name="intent"
                    value={isNewPost?"create":"update"}
                    className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
                    disabled={isCreating||isUpdating}>
                    {isNewPost?(isCreating ? "Creating..." : "Create Post"):null}
                    {isNewPost?null:isUpdating?"Updating":"Update"}
                    </button>
          </div>    
        </Form>
    )
}

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  const errorMessage = "Unknown error";

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}