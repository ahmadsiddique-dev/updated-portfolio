import { client } from "@/sanity/client";
import { getBlogsQuery } from "@/sanity/lib/queries";
import { GetBlogsQueryResult } from "@/sanity/types";

export async function getBlogs() {
  return await client.fetch<GetBlogsQueryResult>(getBlogsQuery);
}