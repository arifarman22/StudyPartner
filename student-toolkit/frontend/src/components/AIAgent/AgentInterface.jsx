<<<<<<< HEAD
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSyllabus } from '../../hooks/useApi'
import { scheduleAPI } from '../../utils/api'
import { Brain, Play, Calendar } from 'lucide-react'

const AgentInterface = () => {
  const { syllabuses } = useSyllabus()
  const [selectedSyllabus, setSelectedSyllabus] = useState('')
  const [studyHours, setStudyHours] = useState(4)
  const [preferredTimes, setPreferredTimes] = useState(['morning', 'afternoon'])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSchedule, setGeneratedSchedule] = useState(null)

  const handleGenerateSchedule = async () => {
    if (!selectedSyllabus) return
    
    setIsGenerating(true)
    try {
      const schedule = await scheduleAPI.generate({
        syllabus_id: parseInt(selectedSyllabus),
        study_hours_per_day: studyHours,
        preferred_study_times: preferredTimes
      })
      setGeneratedSchedule(schedule)
    } catch (error) {
      console.error('Error generating schedule:', error)
    }
    setIsGenerating(false)
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-3">
          <Brain className="text-accent-purple" size={32} />
          <h1 className="text-4xl font-bold gradient-text">AI Study Agent</h1>
        </div>
        <p className="text-gray-400 mt-2">Let AI create the perfect study plan for you</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Schedule Configuration</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Syllabus</label>
              <select
                value={selectedSyllabus}
                onChange={(e) => setSelectedSyllabus(e.target.value)}
                className="w-full p-3 bg-dark-300 rounded-lg"
              >
                <option value="">Choose a syllabus</option>
                {syllabuses.map((syllabus) => (
                  <option key={syllabus.id} value={syllabus.id}>
                    {syllabus.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Study Hours Per Day: {studyHours}h
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={studyHours}
                onChange={(e) => setStudyHours(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preferred Study Times</label>
              <div className="grid grid-cols-2 gap-2">
                {['morning', 'afternoon', 'evening', 'night'].map((time) => (
                  <label key={time} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferredTimes.includes(time)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPreferredTimes([...preferredTimes, time])
                        } else {
                          setPreferredTimes(preferredTimes.filter(t => t !== time))
                        }
                      }}
                      className="rounded text-accent-purple"
                    />
                    <span className="capitalize">{time}</span>
                  </label>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerateSchedule}
              disabled={!selectedSyllabus || isGenerating}
              className="w-full gradient-bg py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Play size={20} />
                  <span>Generate Schedule</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Generated Schedule</h3>
          
          {generatedSchedule ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Generated by AI</span>
                <span className="text-sm text-accent-purple">
                  {new Date(generatedSchedule.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <div className="space-y-3">
                {generatedSchedule.items.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-dark-300 rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.topic.title}</h4>
                      <p className="text-sm text-gray-400">
                        {new Date(item.start_time).toLocaleTimeString()} - {new Date(item.end_time).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${item.completed ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  </div>
                ))}
              </div>
              
              {generatedSchedule.items.length > 5 && (
                <p className="text-center text-gray-400">
                  + {generatedSchedule.items.length - 5} more sessions
                </p>
              )}
              
              <button className="w-full mt-4 py-2 bg-accent-blue rounded-lg font-semibold flex items-center justify-center space-x-2">
                <Calendar size={20} />
                <span>Add to Calendar</span>
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Brain size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-400">Generate your first schedule to see it here</p>
            </div>
          )}
        </motion.div>
      </div>

      {generatedSchedule && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Weekly Overview</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center">
                <div className="font-semibold mb-2">{day}</div>
                <div className="h-20 bg-dark-300 rounded-lg p-2">
                  {/* Placeholder for daily sessions */}
                  <div className="w-3 h-3 bg-accent-purple rounded-full mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

=======
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSyllabus } from '../../hooks/useApi'
import { scheduleAPI } from '../../utils/api'
import { Brain, Play, Calendar } from 'lucide-react'

const AgentInterface = () => {
  const { syllabuses } = useSyllabus()
  const [selectedSyllabus, setSelectedSyllabus] = useState('')
  const [studyHours, setStudyHours] = useState(4)
  const [preferredTimes, setPreferredTimes] = useState(['morning', 'afternoon'])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSchedule, setGeneratedSchedule] = useState(null)

  const handleGenerateSchedule = async () => {
    if (!selectedSyllabus) return
    
    setIsGenerating(true)
    try {
      const schedule = await scheduleAPI.generate({
        syllabus_id: parseInt(selectedSyllabus),
        study_hours_per_day: studyHours,
        preferred_study_times: preferredTimes
      })
      setGeneratedSchedule(schedule)
    } catch (error) {
      console.error('Error generating schedule:', error)
    }
    setIsGenerating(false)
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-3">
          <Brain className="text-accent-purple" size={32} />
          <h1 className="text-4xl font-bold gradient-text">AI Study Agent</h1>
        </div>
        <p className="text-gray-400 mt-2">Let AI create the perfect study plan for you</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Schedule Configuration</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Syllabus</label>
              <select
                value={selectedSyllabus}
                onChange={(e) => setSelectedSyllabus(e.target.value)}
                className="w-full p-3 bg-dark-300 rounded-lg"
              >
                <option value="">Choose a syllabus</option>
                {syllabuses.map((syllabus) => (
                  <option key={syllabus.id} value={syllabus.id}>
                    {syllabus.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Study Hours Per Day: {studyHours}h
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={studyHours}
                onChange={(e) => setStudyHours(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preferred Study Times</label>
              <div className="grid grid-cols-2 gap-2">
                {['morning', 'afternoon', 'evening', 'night'].map((time) => (
                  <label key={time} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferredTimes.includes(time)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPreferredTimes([...preferredTimes, time])
                        } else {
                          setPreferredTimes(preferredTimes.filter(t => t !== time))
                        }
                      }}
                      className="rounded text-accent-purple"
                    />
                    <span className="capitalize">{time}</span>
                  </label>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerateSchedule}
              disabled={!selectedSyllabus || isGenerating}
              className="w-full gradient-bg py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Play size={20} />
                  <span>Generate Schedule</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Generated Schedule</h3>
          
          {generatedSchedule ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Generated by AI</span>
                <span className="text-sm text-accent-purple">
                  {new Date(generatedSchedule.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <div className="space-y-3">
                {generatedSchedule.items.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-dark-300 rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.topic.title}</h4>
                      <p className="text-sm text-gray-400">
                        {new Date(item.start_time).toLocaleTimeString()} - {new Date(item.end_time).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${item.completed ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  </div>
                ))}
              </div>
              
              {generatedSchedule.items.length > 5 && (
                <p className="text-center text-gray-400">
                  + {generatedSchedule.items.length - 5} more sessions
                </p>
              )}
              
              <button className="w-full mt-4 py-2 bg-accent-blue rounded-lg font-semibold flex items-center justify-center space-x-2">
                <Calendar size={20} />
                <span>Add to Calendar</span>
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Brain size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-400">Generate your first schedule to see it here</p>
            </div>
          )}
        </motion.div>
      </div>

      {generatedSchedule && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Weekly Overview</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center">
                <div className="font-semibold mb-2">{day}</div>
                <div className="h-20 bg-dark-300 rounded-lg p-2">
                  {/* Placeholder for daily sessions */}
                  <div className="w-3 h-3 bg-accent-purple rounded-full mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
export default AgentInterface