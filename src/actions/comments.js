import { api } from '../config'

export async function getCommentsByPost(id = 1) {
  let res = await api.get(`/comments?postId=${id}`)
  if (res.status !== 200) throw new Error(`Can't fetch comments list by post id`)

  return res.data
}
