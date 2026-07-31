import { client } from '@/sanity/client'
import { getProjectQuery } from '@/sanity/lib/queries'
import { GetProjectQueryResult } from '@/sanity/types'

export async function getProject(slug: string) {
    if (!slug) {
        throw new Error('Slug is required to fetch project data.')
    }
  return await client.fetch<GetProjectQueryResult>(getProjectQuery, { slug })
}