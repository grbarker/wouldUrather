export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGOUT = 'LOGOUT'

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}
function logOut () {
  return {
    type: LOGOUT,
  }
}

export function handleLogOut () {
  return (dispatch) => {
     dispatch(logOut())
  }
}
