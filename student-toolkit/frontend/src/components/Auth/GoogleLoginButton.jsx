<<<<<<< HEAD
import { motion } from 'framer-motion'
import { Google } from 'lucide-react'
import { authAPI } from '../utils/api'
import { useAuth } from '../hooks/useAuth'
import { useState, useEffect, useRef } from 'react'
import { initializeGoogleAuth, renderGoogleButton } from '../../utils/googleAuth'

const GoogleLoginButton = () => {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoaded, setGoogleLoaded] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    const loadGoogleAuth = async () => {
      try {
        const loaded = await initializeGoogleAuth()
        setGoogleLoaded(loaded)
        
        if (loaded && buttonRef.current) {
          renderGoogleButton(
            'google-button',
            handleGoogleSuccess,
            handleGoogleError
          )
        }
      } catch (error) {
        console.error('Failed to initialize Google Auth:', error)
        setGoogleLoaded(false)
      }
    }

    loadGoogleAuth()
  }, [])

  const handleGoogleSuccess = async (credential) => {
    setIsLoading(true)
    try {
      const result = await authAPI.googleLogin(credential)
      if (result.access_token) {
        await login(result.access_token)
      }
    } catch (error) {
      console.error('Google login failed:', error)
      alert('Google login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleError = (error) => {
    console.error('Google authentication error:', error)
    setIsLoading(false)
  }

  const handleMockGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const mockToken = prompt(
        "Google OAuth is not fully configured.\n\n" +
        "For demo purposes, please enter a mock token (any text):"
      )
      
      if (mockToken) {
        const result = await authAPI.googleLogin(mockToken)
        if (result.access_token) {
          await login(result.access_token)
        }
      }
    } catch (error) {
      console.error('Mock Google login failed:', error)
      alert('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!googleLoaded) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleMockGoogleLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-3 py-3 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-800"></div>
        ) : (
          <>
            <Google size={20} />
            <span>Continue with Google</span>
          </>
        )}
      </motion.button>
    )
  }

  return (
    <div ref={buttonRef} id="google-button" className="w-full">
      {/* Google button will be rendered here automatically */}
    </div>
  )
}

=======
import { motion } from 'framer-motion'
import { Google } from 'lucide-react'
import { authAPI } from '../utils/api'
import { useAuth } from '../hooks/useAuth'
import { useState, useEffect, useRef } from 'react'
import { initializeGoogleAuth, renderGoogleButton } from '../../utils/googleAuth'

const GoogleLoginButton = () => {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoaded, setGoogleLoaded] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    const loadGoogleAuth = async () => {
      try {
        const loaded = await initializeGoogleAuth()
        setGoogleLoaded(loaded)
        
        if (loaded && buttonRef.current) {
          renderGoogleButton(
            'google-button',
            handleGoogleSuccess,
            handleGoogleError
          )
        }
      } catch (error) {
        console.error('Failed to initialize Google Auth:', error)
        setGoogleLoaded(false)
      }
    }

    loadGoogleAuth()
  }, [])

  const handleGoogleSuccess = async (credential) => {
    setIsLoading(true)
    try {
      const result = await authAPI.googleLogin(credential)
      if (result.access_token) {
        await login(result.access_token)
      }
    } catch (error) {
      console.error('Google login failed:', error)
      alert('Google login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleError = (error) => {
    console.error('Google authentication error:', error)
    setIsLoading(false)
  }

  const handleMockGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const mockToken = prompt(
        "Google OAuth is not fully configured.\n\n" +
        "For demo purposes, please enter a mock token (any text):"
      )
      
      if (mockToken) {
        const result = await authAPI.googleLogin(mockToken)
        if (result.access_token) {
          await login(result.access_token)
        }
      }
    } catch (error) {
      console.error('Mock Google login failed:', error)
      alert('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!googleLoaded) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleMockGoogleLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-3 py-3 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-800"></div>
        ) : (
          <>
            <Google size={20} />
            <span>Continue with Google</span>
          </>
        )}
      </motion.button>
    )
  }

  return (
    <div ref={buttonRef} id="google-button" className="w-full">
      {/* Google button will be rendered here automatically */}
    </div>
  )
}

>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
export default GoogleLoginButton