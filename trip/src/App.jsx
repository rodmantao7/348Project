import { Routes,Route } from "react-router-dom"
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Planner from './pages/Planner'
import en_GB from "@douyinfe/semi-ui/lib/es/locale/source/en_GB"
import { LocaleProvider } from "@douyinfe/semi-ui"

function App() {
  return (
    <LocaleProvider locale={en_GB}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/planner" element={<Planner />} />
      </Routes>
    </LocaleProvider>
  )
}

export default App
