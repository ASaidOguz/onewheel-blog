import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";

import favicon from "./routes/images/favicon.ico"

interface LoaderData {
  user: Awaited<ReturnType<typeof getUser>>,
  ENV: string | undefined

}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    href: favicon,
    type: "image/png",
    page:""
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
   
  return json<LoaderData>({ user: await getUser(request),
                ENV:process.env.ADMIN_EMAIL},
           );
};

export default function App() {
  const data=useLoaderData() as LoaderData;
 
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <LiveReload />
      </body>
    </html>
  );
}
