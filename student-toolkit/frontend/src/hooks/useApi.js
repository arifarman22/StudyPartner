import { useState, useEffect } from 'react'
import { syllabusAPI, materialsAPI, scheduleAPI } from '../utils/api'

export const useSyllabus = () => {
  const [syllabuses, setSyllabuses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSyllabuses()
  }, [])

  const fetchSyllabuses = async () => {
    try {
      const data = await syllabusAPI.getAll()
      setSyllabuses(data)
    } catch (error) {
      console.error('Error fetching syllabuses:', error)
    } finally {
      setLoading(false)
    }
  }

  const createSyllabus = async (syllabusData) => {
    try {
      const newSyllabus = await syllabusAPI.create(syllabusData)
      setSyllabuses(prev => [...prev, newSyllabus])
      return newSyllabus
    } catch (error) {
      console.error('Error creating syllabus:', error)
      throw error
    }
  }

  return { syllabuses, loading, fetchSyllabuses, createSyllabus }
}