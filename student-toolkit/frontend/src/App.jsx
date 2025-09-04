import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Navbar from './components/Layout/Navbar'
import Sidebar from './components/Layout/Sidebar'
import Login from './components/Auth/Login'
import Dashboard from './components/Dashboard/Dashboard'
import SyllabusManager from './components/Syllabus/SyllabusManager'
import MaterialsManager from './components/Materials/MaterialsManager'
import ScheduleView from './components/Schedule/ScheduleView'
import AgentInterface from './components/AIAgent/AgentInterface'
import ThreeDBackground from './components/Layout/ThreeDBackground'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex h-screen bg-dark-100 overflow-hidden">
          <ThreeDBackground />
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-6 z-10">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/syllabus" element={<SyllabusManager />} />
                <Route path="/materials" element={<MaterialsManager />} />
                <Route path="/schedule" element={<ScheduleView />} />
                <Route path="/ai-agent" element={<AgentInterface />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App