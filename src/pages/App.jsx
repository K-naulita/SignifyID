import { Routes, Route, Navigate } from 'react-router-dom'
import EmergencyPage from './pages/EmergencyPage'

function App() {
  return (
    <div className="min-h-screen bg-[#ECEFF4] flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-[#F3F5F8] relative">
        <Routes>
          <Route path="/" element={<Navigate to="/emergency" replace />} />
          <Route path="/emergency" element={<EmergencyPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
