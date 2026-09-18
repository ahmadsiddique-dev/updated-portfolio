import { client } from '@/sanity/client';
import { getProjectsQuery } from '@/sanity/lib/queries'
import { GetProjectsQueryResult } from '@/sanity/types';
import { sanityFetch } from '@/sanity/live'

export async function getProjects() {
  // return await client.fetch<GetProjectsQueryResult>(getProjectsQuery);
  const { data } = await sanityFetch({
    query: getProjectsQuery
  })

  return data as GetProjectsQueryResult;
}