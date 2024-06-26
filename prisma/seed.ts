import {  PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
//import invariant from "tiny-invariant";

const prisma = new PrismaClient();

/* export async function loader() {
  invariant(process.env.ADMIN_EMAIL!=undefined,"Need to be string")
  invariant(process.env.ADMIN_PASSWORD!=undefined,"Need to be string")
  return ({email:process.env.ADMIN_EMAIL,
               password:process.env.ADMIN_PASSWORD})
} */
async function seed() {
  const email="rachel@remix.run"
  //const {email,password}=await loader()
  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("rachelcool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const posts = [
    {
      slug: "my-first-post",
      title: "My First Post!",
      markdown: `
# This is my first post!

Isn't it great?
      `.trim(),
    },
    {
      slug: "trail-riding-with-onewheel",
      title: "Trail Riding with Onewheel",
      markdown: `
# Floating the trails

Have you ever tried riding a onewheel? It's an out-of-this-world _experience_!
Imagine that, but in the beauty of nature and it's just amazing.
      `.trim(),
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
