import { client } from '@/sanity/client'
import { getSkillsQuery } from '@/sanity/lib/queries'
import { GetSkillsQueryResult } from '@/sanity/types'


export async function getSkills(tag: string) {
  return client.fetch<GetSkillsQueryResult>(getSkillsQuery, { tag })
}