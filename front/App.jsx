

import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
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
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `mr-4 font-medium ${isActive ? 'text-blue-700 font-bold' : 'text-blue-500'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-medium ${isActive ? 'text-blue-700 font-bold' : 'text-blue-500'}`
            }
          >
            About
          </NavLink>
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