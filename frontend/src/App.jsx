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
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
          <p><strong>상호명:</strong> 청주공항 반값 셔틀 주차장 | <strong>대표:</strong> 홍길동</p>
          <p><strong>주소:</strong> 충청북도 청주시 청원구 외남동 76-1</p>
          <p><strong>사업자등록번호:</strong> 123-45-67890 | <strong>고객센터:</strong> 043-298-1234 / 010-5178-4756</p>
          <p style={{ marginTop: '1rem' }}>&copy; {(new Date().getFullYear())} 청주공항 반값 셔틀 주차장. All rights reserved.</p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Ver 1.6.0 | Last Updated: 2026.03.01</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
