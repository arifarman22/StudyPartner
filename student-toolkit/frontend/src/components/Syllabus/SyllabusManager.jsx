import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSyllabus } from '../../hooks/useApi'
import { Plus, BookOpen, Trash2 } from 'lucide-react'

const SyllabusManager = () => {
  const { syllabuses, createSyllabus, loading } = useSyllabus()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    topics: [{ title: '', estimated_hours: 0, priority: 1, order: 0 }]
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createSyllabus(formData)
      setShowForm(false)
      setFormData({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        topics: [{ title: '', estimated_hours: 0, priority: 1, order: 0 }]
      })
    } catch (error) {
      console.error('Error creating syllabus:', error)
    }
  }

  const addTopic = () => {
    setFormData(prev => ({
      ...prev,
      topics: [...prev.topics, { title: '', estimated_hours: 0, priority: 1, order: prev.topics.length }]
    }))
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold gradient-text"
        >
          Syllabus Manager
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 gradient-bg rounded-lg"
        >
          <Plus size={20} />
          <span>New Syllabus</span>
        </motion.button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Create New Syllabus</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 bg-dark-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-dark-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full p-3 bg-dark-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="w-full p-3 bg-dark-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium">Topics</label>
                <button
                  type="button"
                  onClick={addTopic}
                  className="text-accent-blue hover:text-accent-purple"
                >
                  + Add Topic
                </button>
              </div>
              
              {formData.topics.map((topic, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <input
                    type="text"
                    placeholder="Topic title"
                    value={topic.title}
                    onChange={(e) => {
                      const newTopics = [...formData.topics]
                      newTopics[index].title = e.target.value
                      setFormData({ ...formData, topics: newTopics })
                    }}
                    className="p-2 bg-dark-300 rounded-lg"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Hours"
                    value={topic.estimated_hours}
                    onChange={(e) => {
                      const newTopics = [...formData.topics]
                      newTopics[index].estimated_hours = parseFloat(e.target.value)
                      setFormData({ ...formData, topics: newTopics })
                    }}
                    className="p-2 bg-dark-300 rounded-lg"
                    min="0"
                    step="0.5"
                    required
                  />
                  <select
                    value={topic.priority}
                    onChange={(e) => {
                      const newTopics = [...formData.topics]
                      newTopics[index].priority = parseInt(e.target.value)
                      setFormData({ ...formData, topics: newTopics })
                    }}
                    className="p-2 bg-dark-300 rounded-lg"
                  >
                    <option value={1}>Low Priority</option>
                    <option value={2}>Medium Priority</option>
                    <option value={3}>High Priority</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      const newTopics = formData.topics.filter((_, i) => i !== index)
                      setFormData({ ...formData, topics: newTopics })
                    }}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 gradient-bg rounded-lg"
              >
                Create Syllabus
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-dark-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {syllabuses.map((syllabus) => (
          <motion.div
            key={syllabus.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-effect rounded-xl p-6 hover-lift"
          >
            <div className="flex items-start justify-between mb-4">
              <BookOpen className="text-accent-purple" size={24} />
              <span className="text-sm text-gray-400">
                {new Date(syllabus.start_date).toLocaleDateString()} - {new Date(syllabus.end_date).toLocaleDateString()}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{syllabus.title}</h3>
            <p className="text-gray-400 mb-4">{syllabus.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Topics</span>
                <span>{syllabus.topics.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Hours</span>
                <span>{syllabus.topics.reduce((sum, topic) => sum + topic.estimated_hours, 0)}h</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span>{syllabus.topics.filter(t => t.completed).length}/{syllabus.topics.length}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SyllabusManager