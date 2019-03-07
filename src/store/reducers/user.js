export const actionTypes = {
  SET: `USER_SET`,
  UNSET: `USER_UNSET`,
}

const initState = {}

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SET:
      return { ...action.payload }
    case actionTypes.UNSET:
      return { ...initState }
    default:
      return state
  }
}
