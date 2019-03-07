export const actionTypes = {
  SET: `USERS_SET`,
}

const initState = []

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SET:
      return [...action.payload]
    default:
      return state
  }
}
