import { client } from "@/sanity/client";
import { getBlogQuery } from "@/sanity/lib/queries";
import { GetBlogQueryResult } from "@/sanity/types";

export async function getBlog(slug: string) {
  return client.fetch<GetBlogQueryResult>(getBlogQuery, {
    slug,
  });
}
