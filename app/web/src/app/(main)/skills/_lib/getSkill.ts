import { client } from '@/sanity/client'
import { getSkillsQuery } from '@/sanity/lib/queries'
import { GetSkillsQueryResult } from '@/sanity/types'


export async function getSkills() {
  return client.fetch<GetSkillsQueryResult>(getSkillsQuery)
}