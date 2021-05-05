import { api } from '../config'
import { IUser } from '../models'

export async function get(): Promise<[IUser[], number]> {
  const response = await api.get('/users')
  if (response.status !== 200) throw new Error(`Can't fetch users list`)

  return response.data
}
