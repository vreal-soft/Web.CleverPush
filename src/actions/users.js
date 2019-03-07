import { api } from '../config'
import store from '../store'
import { actionTypes as usersActionTypes } from '../store/reducers/users'
import { actionTypes as userActionTypes } from '../store/reducers/user'
import history from '../utils/history'

// common http request
export async function getUser(id = 1) {
  let res = await api.get(`/users/${id}`)
  if (res.status !== 200) throw new Error(`Can't fetch user by id ${id}`)

  return res.data
}

// http request + redux store
export async function getUsers() {
  let res = await api.get('/users')
  if (res.status !== 200) throw new Error(`Can't fetch user list`)

  store.dispatch({ type: usersActionTypes.SET, payload: res.data })
}

// common redux action
export function setUser(user) {
  store.dispatch({ type: userActionTypes.SET, payload: user })
  localStorage.setItem('user', JSON.stringify(user))
}

export function unsetUser() {
  store.dispatch({ type: userActionTypes.UNSET })
  localStorage.removeItem('user')
  history.replace('/login')
}

export async function authUser() {
  try {
    let user = JSON.parse(localStorage.getItem('user'))
    setUser(user)

    return user
  } catch (e) {
    return null
  }
}
