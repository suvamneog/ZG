import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Achievements from './pages/Achievements'
import Discography from './pages/Discography'
import Filmography from './pages/Filmography'
import Gallery from './pages/Gallery'
import Tributes from './pages/Tributes'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/discography" element={<Discography />} />
          <Route path="/filmography" element={<Filmography />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/tributes" element={<Tributes />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App