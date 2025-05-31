'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function FloatingControls() {
  const [showControls, setShowControls] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowControls(scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!showControls) return null

  const buttonStyle = {
    width: '40px',
    height: '40px',
    padding: '0',
    backgroundColor: 'var(--button-bg)',
    color: 'var(--text)',
    border: '1px solid var(--button-border)',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontSize: '1.4rem',
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        display: 'flex',
        gap: '0.5rem',
        zIndex: 100,
      }}
    >
      <button
        onClick={toggleTheme}
        style={buttonStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--button-hover)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--button-bg)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <button
        onClick={scrollToTop}
        style={buttonStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--button-hover)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--button-bg)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
        aria-label="Scroll to top"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  )
}