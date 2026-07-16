import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Domains from './pages/Domains'
import Services from './pages/Services'
import Quiz from './pages/Quiz'
import ExamMode from './pages/ExamMode'
import StudyPlan from './pages/StudyPlan'
import Flashcards from './pages/Flashcards'
import Traps from './pages/Traps'
import Vocabulary from './pages/Vocabulary'
import WellArchitected from './pages/WellArchitected'
import Progress from './pages/Progress'
import Labs from './pages/Labs'
import CheatSheet from './pages/CheatSheet'
import Architectures from './pages/Architectures'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/plan" element={<StudyPlan />} />
        <Route path="/domains" element={<Domains />} />
        <Route path="/services" element={<Services />} />
        <Route path="/well-architected" element={<WellArchitected />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/architectures" element={<Architectures />} />
        <Route path="/cheatsheet" element={<CheatSheet />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/traps" element={<Traps />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/progress" element={<Progress />} />
      </Route>
      <Route path="/exam" element={<ExamMode />} />
    </Routes>
  )
}
