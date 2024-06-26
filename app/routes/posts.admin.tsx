import { LoaderFunction,json } from "@remix-run/node"
import { Link, Outlet, useLoaderData } from "@remix-run/react"

import { GetPostListings } from "~/models/posts.server"
import { requireAdminUser } from "~/session.server"

interface LoaderData {
    posts:Awaited<ReturnType<typeof GetPostListings>>
    }
export const loader:LoaderFunction=async({request})=>{
       await requireAdminUser(request);
       return json<LoaderData>({posts:await GetPostListings()})
}
export default function AdminRoute(){
    const{posts}=useLoaderData() as LoaderData
    return(
        <div className="mx-auto max-w-4xl">
        <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">Blog Admin</h1>
        <div className="grid grid-cols-4 gap-6">
          <nav className="col-span-4 md:col-span-1">
            <ul>
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link to={post.slug} className="text-blue-600 underline">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <main className="col-span-4 md:col-span-3">
            <Outlet/>
          </main>
        </div>
      </div>
    )
}