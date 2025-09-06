<<<<<<< HEAD
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { Home, BookOpen, Folder, Calendar, Brain } from 'lucide-react'

const menuItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/syllabus', icon: BookOpen, label: 'Syllabus' },
  { path: '/materials', icon: Folder, label: 'Materials' },
  { path: '/schedule', icon: Calendar, label: 'Schedule' },
  { path: '/ai-agent', icon: Brain, label: 'AI Agent' },
]

const Sidebar = () => {
  return (
    <motion.div 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 glass-effect rounded-lg m-4 p-4 hidden md:block"
    >
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-accent-purple text-white'
                    : 'text-gray-300 hover:bg-dark-300'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

=======
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { Home, BookOpen, Folder, Calendar, Brain } from 'lucide-react'

const menuItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/syllabus', icon: BookOpen, label: 'Syllabus' },
  { path: '/materials', icon: Folder, label: 'Materials' },
  { path: '/schedule', icon: Calendar, label: 'Schedule' },
  { path: '/ai-agent', icon: Brain, label: 'AI Agent' },
]

const Sidebar = () => {
  return (
    <motion.div 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 glass-effect rounded-lg m-4 p-4 hidden md:block"
    >
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-accent-purple text-white'
                    : 'text-gray-300 hover:bg-dark-300'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
export default Sidebar