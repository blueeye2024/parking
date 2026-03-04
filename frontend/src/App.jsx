import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaCar, FaBars, FaTimes, FaPhoneVolume, FaCalendarPlus } from 'react-icons/fa';
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

  const navItems = [
    { path: '/about', label: '소개하기' },
    { path: '/', label: '예약하기' },
    { path: '/check', label: '예약확인' },
    { path: '/guide', label: '이용방법' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b-2 border-brand shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-brand-dark font-bold text-xl tracking-tight no-underline" onClick={closeMenu}>
          <FaCar className="text-brand text-2xl" />
          <span>청주공항 반값셔틀</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 no-underline
                ${location.pathname === item.path
                  ? 'text-brand bg-blue-50'
                  : 'text-slate-600 hover:text-brand hover:bg-slate-100'
                }`}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-brand text-2xl p-1" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Dropdown */}
        {isOpen && (
          <nav className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-lg flex flex-col p-3 gap-1 md:hidden z-50">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors no-underline
                  ${location.pathname === item.path
                    ? 'text-brand bg-blue-50'
                    : 'text-slate-700 hover:bg-slate-50'
                  }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />

        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <Routes>
            <Route path="/" element={<Reserve />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/check" element={<CheckReservation />} />
            <Route path="/guide" element={<HowToUse />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 mt-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-1.5">
                <p className="text-white font-semibold text-base mb-2">청주공항 반값 셔틀 주차장</p>
                <p><span className="text-slate-500">대표</span> 박창현</p>
                <p><span className="text-slate-500">주소</span> 충청북도 청주시 청원구 외남동 76-1</p>
                <p><span className="text-slate-500">사업자등록번호</span> 123-45-67890</p>
              </div>
              <div className="space-y-1.5 md:text-right">
                <p className="text-white font-semibold text-base mb-2">고객센터</p>
                <p>043-298-1234</p>
                <p>010-5178-4756</p>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
              <p><Link to="/admin" className="no-underline text-slate-500 hover:text-slate-400 transition-colors">&copy;</Link> {new Date().getFullYear()} 청주공항 반값 셔틀 주차장. All rights reserved.</p>
              <p>Ver 2.0.0 | Last Updated: 2026.03.01</p>
            </div>
          </div>
        </footer>

        {/* Mobile Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
          <a
            href="tel:01051784756"
            className="flex-1 flex-center gap-2 py-4 bg-slate-800 text-white font-bold text-base no-underline"
          >
            <FaPhoneVolume /> 전화 상담
          </a>
          <Link
            to="/"
            className="flex-1 flex-center gap-2 py-4 bg-brand text-white font-bold text-base no-underline"
            onClick={() => window.scrollTo(0, 0)}
          >
            <FaCalendarPlus /> 실시간 예약
          </Link>
        </div>
      </div>
    </Router>
  );
}

export default App;
