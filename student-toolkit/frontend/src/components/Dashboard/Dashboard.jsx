<<<<<<< HEAD
import { motion } from 'framer-motion'
import { useSyllabus } from '../../hooks/useApi'
import { BookOpen, Calendar, FileText, Brain } from 'lucide-react'

const StatsCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="glass-effect rounded-xl p-6 text-center"
  >
    <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="text-2xl font-bold gradient-text">{value}</h3>
    <p className="text-gray-400">{label}</p>
  </motion.div>
)

const Dashboard = () => {
  const { syllabuses, loading } = useSyllabus()

  if (loading) {
    return <div>Loading...</div>
  }

  const stats = [
    { icon: BookOpen, label: 'Syllabuses', value: syllabuses.length, color: 'bg-accent-purple' },
    { icon: Calendar, label: 'Active Plans', value: '3', color: 'bg-accent-blue' },
    { icon: FileText, label: 'Materials', value: '24', color: 'bg-green-500' },
    { icon: Brain, label: 'AI Sessions', value: '12', color: 'bg-accent-pink' },
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome to your personalized study hub</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Recent Syllabuses</h3>
          <div className="space-y-4">
            {syllabuses.slice(0, 3).map((syllabus) => (
              <div key={syllabus.id} className="flex items-center justify-between p-3 bg-dark-300 rounded-lg">
                <div>
                  <h4 className="font-medium">{syllabus.title}</h4>
                  <p className="text-sm text-gray-400">{syllabus.topics.length} topics</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    {new Date(syllabus.start_date).toLocaleDateString()} - {new Date(syllabus.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Study Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Mathematics</span>
                <span className="text-sm">65%</span>
              </div>
              <div className="w-full bg-dark-300 rounded-full h-2">
                <div className="bg-accent-purple h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Physics</span>
                <span className="text-sm">42%</span>
              </div>
              <div className="w-full bg-dark-300 rounded-full h-2">
                <div className="bg-accent-blue h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Chemistry</span>
                <span className="text-sm">78%</span>
              </div>
              <div className="w-full bg-dark-300 rounded-full h-2">
                <div className="bg-accent-pink h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

=======
import { motion } from 'framer-motion'
import { useSyllabus } from '../../hooks/useApi'
import { BookOpen, Calendar, FileText, Brain } from 'lucide-react'

const StatsCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="glass-effect rounded-xl p-6 text-center"
  >
    <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="text-2xl font-bold gradient-text">{value}</h3>
    <p className="text-gray-400">{label}</p>
  </motion.div>
)

const Dashboard = () => {
  const { syllabuses, loading } = useSyllabus()

  if (loading) {
    return <div>Loading...</div>
  }

  const stats = [
    { icon: BookOpen, label: 'Syllabuses', value: syllabuses.length, color: 'bg-accent-purple' },
    { icon: Calendar, label: 'Active Plans', value: '3', color: 'bg-accent-blue' },
    { icon: FileText, label: 'Materials', value: '24', color: 'bg-green-500' },
    { icon: Brain, label: 'AI Sessions', value: '12', color: 'bg-accent-pink' },
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome to your personalized study hub</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Recent Syllabuses</h3>
          <div className="space-y-4">
            {syllabuses.slice(0, 3).map((syllabus) => (
              <div key={syllabus.id} className="flex items-center justify-between p-3 bg-dark-300 rounded-lg">
                <div>
                  <h4 className="font-medium">{syllabus.title}</h4>
                  <p className="text-sm text-gray-400">{syllabus.topics.length} topics</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    {new Date(syllabus.start_date).toLocaleDateString()} - {new Date(syllabus.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Study Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Mathematics</span>
                <span className="text-sm">65%</span>
              </div>
              <div className="w-full bg-dark-300 rounded-full h-2">
                <div className="bg-accent-purple h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Physics</span>
                <span className="text-sm">42%</span>
              </div>
              <div className="w-full bg-dark-300 rounded-full h-2">
                <div className="bg-accent-blue h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Chemistry</span>
                <span className="text-sm">78%</span>
              </div>
              <div className="w-full bg-dark-300 rounded-full h-2">
                <div className="bg-accent-pink h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
export default Dashboard