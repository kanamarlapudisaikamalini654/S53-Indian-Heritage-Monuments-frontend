import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Monuments from './pages/Monuments.jsx';
import MonumentDetails from './pages/MonumentDetails.jsx';
import VirtualTour from './pages/VirtualTour.jsx';
import Blog from './pages/Blog.jsx';
import Quiz from './pages/Quiz.jsx';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About.jsx';
import './styles/global.css';


export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/monuments" element={<Monuments />} />
          <Route path="/monument/:id" element={<MonumentDetails />} />
          <Route path="/virtual-tour" element={<VirtualTour />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}