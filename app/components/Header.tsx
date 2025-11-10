'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav>
        <div className="logo">✈ BlogViajes</div>
        <div 
          className="hamburger" 
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </div>

        <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link href="/" onClick={closeMenu}>Inicio</Link></li>
          <li>
            <a href="#contenido">Blogs ▾</a>
            <ul className="submenu">
            <li><Link href="/posts/post1">París en 3 días</Link></li>
  <li><Link href="/posts/post2">Una semana en Amsterdam</Link></li>
  <li><Link href="/posts/post3">Visitamos Berlín</Link></li>
            </ul>
          </li>
          <li><Link href="/about" onClick={closeMenu}>Sobre Nosotros</Link></li>
          <li><a href="#footer" onClick={closeMenu}>Contacto</a></li>
        </ul>
      </nav>
    </>
  );
}