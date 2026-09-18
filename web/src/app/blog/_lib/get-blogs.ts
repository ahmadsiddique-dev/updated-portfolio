// import { client } from "@/sanity/client";
import { getBlogsQuery } from "@/sanity/lib/queries";
import { GetBlogsQueryResult } from "@/sanity/types";
import { sanityFetch } from '@/sanity/live'

export async function getBlogs() {
  // return await client.fetch<GetBlogsQueryResult>(getBlogsQuery);
  const { data } = await sanityFetch({
    query: getBlogsQuery,
    perspective: "published",
    stega: false
  })

  return data as GetBlogsQueryResult;
}