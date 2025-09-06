<<<<<<< HEAD
import { motion } from 'framer-motion'
import { BookOpen, Calendar, FileText, Brain, LogOut, User } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
  const { currentUser, logout } = useAuth()

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-effect rounded-lg m-4 p-4 flex justify-between items-center"
    >
      <div className="flex items-center space-x-2">
        <BookOpen className="text-accent-purple" size={24} />
        <h1 className="text-xl font-bold gradient-text">Student Toolkit</h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-sm">
          <User size={16} />
          <span>{currentUser?.name}</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="flex items-center space-x-2 px-4 py-2 bg-accent-purple rounded-lg hover:bg-accent-blue transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.nav>
  )
}

=======
import { motion } from 'framer-motion'
import { BookOpen, Calendar, FileText, Brain, LogOut, User } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
  const { currentUser, logout } = useAuth()

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-effect rounded-lg m-4 p-4 flex justify-between items-center"
    >
      <div className="flex items-center space-x-2">
        <BookOpen className="text-accent-purple" size={24} />
        <h1 className="text-xl font-bold gradient-text">Student Toolkit</h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-sm">
          <User size={16} />
          <span>{currentUser?.name}</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="flex items-center space-x-2 px-4 py-2 bg-accent-purple rounded-lg hover:bg-accent-blue transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.nav>
  )
}

>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
export default Navbar