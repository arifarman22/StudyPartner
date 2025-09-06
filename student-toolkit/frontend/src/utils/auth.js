<<<<<<< HEAD
export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const removeToken = () => {
  localStorage.removeItem('token')
=======
export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const removeToken = () => {
  localStorage.removeItem('token')
>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
}