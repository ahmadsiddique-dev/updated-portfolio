import { defineQuery } from "next-sanity";

export const getBlogsQuery = defineQuery(`
  *[_type == "blog"] {
    _id,
    title,
    slug,
    time,
    createdAt,
    description,
    "image": image.asset->url
  }
`);

export const getBlogQuery = defineQuery(`
  *[show == true && slug.current == $slug]{
  _id,
  title,
  "image": image.asset->url,
  time,
  description,
  detail,
  createdAt,
 }
`);

export const getProjectsQuery = defineQuery(`
  *[_type == 'project' && show == true] {
  _id,
  createdAt,
  description,
  "slug": slug.current,
  title
}
`)

export const getProjectQuery = defineQuery(`
  *[_type == 'project' && show == true && slug.current == $slug] {
  _id,
  createdAt,
  description,
  "image": image.asset->url,
  "slug": slug.current,
  title,
  detail
}
`)

export const getSkillsQuery = defineQuery(`
  *[_type == "skill" && tag == $skillTag] {
  name,
  "image": image.asset->url
}
`)