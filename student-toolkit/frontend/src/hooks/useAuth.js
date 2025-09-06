<<<<<<< HEAD
import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../utils/api'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authAPI.getMe(token)
        .then(user => {
          setCurrentUser(user)
          setLoading(false)
        })
        .catch(() => {
          localStorage.removeItem('token')
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = (token) => {
    localStorage.setItem('token', token)
    return authAPI.getMe(token)
      .then(user => {
        setCurrentUser(user)
        return user
      })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
=======
import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../utils/api'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authAPI.getMe(token)
        .then(user => {
          setCurrentUser(user)
          setLoading(false)
        })
        .catch(() => {
          localStorage.removeItem('token')
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = (token) => {
    localStorage.setItem('token', token)
    return authAPI.getMe(token)
      .then(user => {
        setCurrentUser(user)
        return user
      })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
}