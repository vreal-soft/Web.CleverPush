import { api } from '../config'

export async function getPosts() {
  let res = await api.get('/posts')
  if (res.status !== 200) throw new Error(`Can't fetch post list`)

  return res.data
}

export async function getPost(id = 1) {
  let res = await api.get(`/posts/${id}`)
  if (res.status !== 200) throw new Error(`Can't fetch post`)

  return res.data
}

export async function getPostsByUser(id = 1) {
  let res = await api.get(`/posts?userId=${id}`)
  if (res.status !== 200) throw new Error(`Can't fetch post list by user id`)

  return res.data
}
