import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaCar, FaBars, FaTimes } from 'react-icons/fa';
import Reserve from './components/Reserve';
import CheckReservation from './components/CheckReservation';
import HowToUse from './components/HowToUse';
import AboutUs from './components/AboutUs';
import Admin from './components/Admin';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <FaCar />
          청주공항 반값 셔틀 주차장
        </Link>
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link
            to="/about"
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            소개하기
          </Link>
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            예약하기
          </Link>
          <Link
            to="/check"
            className={`nav-link ${location.pathname === '/check' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            예약확인
          </Link>
          <Link
            to="/guide"
            className={`nav-link ${location.pathname === '/guide' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            이용방법
          </Link>
        </nav>
      </div>
    </header>
  );
};

function App() {
  return (
    <Router>
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Reserve />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/check" element={<CheckReservation />} />
          <Route path="/guide" element={<HowToUse />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>&copy; {(new Date().getFullYear())} 청주공항 반값 셔틀 주차장. All rights reserved.</p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Ver 1.4.2 | Last Updated: 2026.03.01</p>
      </footer>
    </Router>
  );
}

export default App;
