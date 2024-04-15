/* eslint-disable react/no-unescaped-entities */
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

import githubicon from "./images/github-icon1.png";
import linkedInicon from "./images/linkedIn.png";
import npm_svg from "./images/npm.svg";
import submarine from "./images/TorpedoPistolIXC41.png";
import xicon from "./images/x-icon.png";

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600">
      <div className="absolute top-0 right-0 mt-5 mr-5 z-10">
        {user ? (
          <Link
            to="/notes"
            className="flex items-end rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
          >
            View Notes for {user.email}
          </Link>
        ) : (
          <div className="space-y-4 sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
            <Link
              to="/login"
              className="flex items-end rounded-md bg-purple-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
            >
              Log In
            </Link>
          </div>
        )}
      </div>

      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src={submarine}
                alt="Submarine Ready to Fire"
              />
              <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-2xl font-extrabold tracking-tight sm:text-6xl lg:text-6xl">
                <span className="block uppercase text-purple-500 drop-shadow-md">
                  TorpedopistolIXC41
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Check the README.md file for instructions on how to get this
                project deployed.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl text-center">
          <div className="bg-white shadow-md rounded-lg p-6 my-4">
            <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
            <p className="text-lg text-gray-700 mb-4">
              Check out our latest blog posts for interesting reads.
            </p>
            <Link to="/posts" className="text-blue-600 underline hover:text-blue-700">
              View Blog Posts
            </Link>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 my-4">
            <h2 className="text-2xl font-semibold mb-4">My Educational NFT's</h2>
            <p className="text-lg text-gray-700 mb-4">
              Explore my collection of educational NFT's.
            </p>
            <Link to="/nft" prefetch="intent" className="text-blue-600 underline hover:text-blue-700">
              View NFT's
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            {[
              {
                src: githubicon,
                alt: "github.com",
                href: "https://github.com/ASaidOguz",
              },
              {
                src: xicon,
                alt: "x.com",
                href: "https://twitter.com/AhmetSaidOuz1",
              },
              {
                src: linkedInicon,
                alt: "linkedin.com",
                href: "https://www.linkedin.com/in/ahmet-said-oguz/",
              },
              {
                src: npm_svg,
                alt: "Node package manager",
                href: "https://www.npmjs.com/package/@asaidoguz/audit-parser",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
                alt: "Cypress",
                href: "https://www.cypress.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772386-75444196-0604-4340-af28-53b236faa182.svg",
                alt: "MSW",
                href: "https://mswjs.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
                alt: "Vitest",
                href: "https://vitest.dev",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
                alt: "Testing Library",
                href: "https://testing-library.com",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
                alt: "Prettier",
                href: "https://prettier.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
                alt: "ESLint",
                href: "https://eslint.org",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
                alt: "TypeScript",
                href: "https://typescriptlang.org",
              },
            ].map((img) => (
              <a
                key={img.href}
                href={img.href}
                className="flex h-16 w-32 justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0"
                target="_blank"
                rel="noreferrer"
              >
                <img alt={img.alt} src={img.src} className="object-contain" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
