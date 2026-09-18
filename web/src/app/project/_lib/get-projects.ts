import { client } from '@/sanity/client';
import { getProjectsQuery } from '@/sanity/lib/queries'
import { GetProjectsQueryResult } from '@/sanity/types';

export async function getProjects() {
  return await client.fetch<GetProjectsQueryResult>(getProjectsQuery, {}, {
    cache: "no-cache" 
  });
}