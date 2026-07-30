import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpenText, CalendarRange } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getBlogs } from "./_lib/get-blogs";
import { formatDate } from "./_lib/time-formater";

export const metadata: Metadata = {
  title: "My Blogs | Ahmad Siddique",
  description:
    "Read my latest articles, tutorials, and thoughts on web development and software engineering.",
  openGraph: {
    title: "My Blogs | Ahmad Siddique",
    description:
      "Read my latest articles, tutorials, and thoughts on web development and software engineering.",
    url: "https://ahmadsiddique.dev/blog",
    images: [
      {
        url: "https://ahmadsiddique.dev/preview.png", // This image is inappropriate for this size.
        width: 1200,
        height: 630,
        alt: "Ahmad Siddique Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Blogs | Ahmad Siddique",
    description:
      "Read my latest articles, tutorials, and thoughts on web development and software engineering.",
    images: ["https://ahmadsiddique.dev/preview.png"],
  },
};

export default async function BlogPage() {
  const blogs = await getBlogs();
  return (
    <main id="main-content">
      <div className="mb-6  pt-10">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground duration-200 flex items-center gap-1.5 w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Go Home</span>
        </Link>
      </div> 
      <h1 className="pb-7 text-3xl font-bold">My Blogs</h1>
      <section className="flex flex-col gap-4">
        {blogs.map((blog) => (
          <Link key={blog._id} href={blog.slug ? `/blog/${blog.slug.current}` : "/not-found"}>
            <Card className="flex flex-col sm:flex-row w-full sm:max-w-3xl p-4 gap-5 bg-transparent border-zinc-200 max-w-107.5 mx-auto dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
              <div className="relative w-full sm:w-65 h-45 shrink-0 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a] overflow-hidden">
                {blog.image && (
                  <Image
                    src={blog.image}
                    alt={blog.title || ""}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col flex-1 py-1">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 line-clamp-1 mb-3">
                  {blog.title}
                </h2>
                <div className="flex items-center justify-start gap-5 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <CalendarRange size={16} />
                    {blog.createdAt && formatDate(blog.createdAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpenText className="mt-0.5" size={16} />
                    {blog.time} min read
                  </span>
                </div>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                  {blog.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
};

