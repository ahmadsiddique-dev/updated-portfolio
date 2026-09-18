import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/full-width-divider";
import { getProjects } from './_lib/get-projects'
import { formatDate } from "../../lib/time-formater";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects built by Ahmad Siddique — including Feedo (anonymous feedback), Gravity (hostel management), and Access (English Access Scholarship Program).",
  openGraph: {
    title: "Projects — Ahmad Siddique",
    description:
      "Explore projects built by Ahmad Siddique — Feedo, Gravity, Access, and more.",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main id="main-content">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-start md:border-x">
        <div className=" px-5 pt-7">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground duration-200 flex items-center gap-1.5 w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
        </div>
        <div className="px-4 py-6 md:py-7">
          <h1 className="font-bold text-xl tracking-tight md:text-3xl">
            Projects
          </h1>
        </div>

        <div className="relative" >
          <FullWidthDivider />
          <div className="divide-y">
            {projects.map((project) => (
              <BlogCard {...project} key={project.title} />
            ))}
          </div>
          <FullWidthDivider />
        </div>
      </div>
    </main>
  );
}


function BlogCard({
  title,
  description,
  createdAt,
  slug,
  className,
  ...props
}: Omit<React.ComponentProps<"a">, "title"> & {
  title: string | null;
  createdAt: string | null;
  description: string | null;
  slug: string | null;
}) {
  return (
    <Link
      href={`/project/${slug}`}
      className={cn(
        "group flex h-24 w-full flex-col justify-center gap-y-1 p-4 hover:cursor-pointer hover:bg-accent/30 active:bg-accent dark:active:bg-accent/50",
        className
      )}
      {...props}
    >
      <div className="relative flex items-end justify-center gap-2">
        <h2 className="whitespace-nowrap font-medium text-foreground text-md md:text-lg">
          {title}
        </h2>
        <span className="mb-1.5 w-full border-b-2 border-dashed" />
        <span className="whitespace-nowrap font-mono text-[12px] text-muted-foreground uppercase group-hover:text-foreground">
          {createdAt && formatDate(createdAt)}
        </span>
      </div>
      <div className="max-w-sm text-muted-foreground text-[12px] md:text-sm group-hover:text-foreground md:max-w-full">
        {description}
      </div>
    </Link>
  );
}

