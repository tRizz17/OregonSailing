import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="max-w-4xl mx-auto px-6">
        <nav className="flex items-center py-4">
          <Link to="/" className="mr-4">
            <img src="/sailboat-logo.svg" alt="Logo" className="w-8" />
          </Link>
          <Link to="/" className="mr-4 font-medium">Home</Link>
          <Link to="/about" className="text-blue-500">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;