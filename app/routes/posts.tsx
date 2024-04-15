import { Outlet } from "@remix-run/react";

export default function PostsRoute(){
     return( <div>This will be home
        <Outlet/></div>)
}

export function ErrorBoundary({error}:{error:unknown}) {
    if(error instanceof Error){
        return (
            <div>
              <h1>Uh oh ...</h1>
              <p>Something went wrong.</p>
              <pre>{error.message}</pre>
            </div>
          );
    }
  
    return (
      <div>
        <h1>Uh oh ...</h1>
        <p>Something went wrong.</p>
      </div>
    );
  }