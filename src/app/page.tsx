'use client'

import { useEffect } from 'react'
import Nav from './nav'
import MyFooter from './footer'

export default function Home() {
  useEffect(() => {
    const font = document.createElement('link')
    font.rel = 'stylesheet'
    font.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap'
    document.head.appendChild(font)
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#fdfcf7',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
      }}
    >
      <div
        style={{
          textAlign: 'left',
          maxWidth: '600px',
          padding: '2rem',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <Nav></Nav>

        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem', marginTop: '5rem' }}>
          Hello and welcome! My name is Spencer Lommel, I mostly like programming in C, C++, Go, and Python when needed, so I don't really do a lot of web development :P
        </p>

        <p style={{ fontSize: '1.3rem', lineHeight: '1.6', marginBottom: '2rem'}}>I was working on a pretty cool embedded Linux project and I got a lot of questions online about it so I decided to make this page. Check out the project <a href='#'>here!</a></p>

        <p style={{ fontSize: '1rem', fontWeight: 'bold', lineHeight: '1.6', marginBottom: '2rem'}}>I am a CS Major at NDSU, and a Systems Programmer Intern at Marvin Windows. I really like hardware reverse engineering and working with microcontrollers! Check out my Github or Projects tab to see more of what I like to make! :-)</p>

        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <MyFooter></MyFooter>
        </div>
      </div>
    </div>
  )
}

function SoftButton({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: '0.4rem 1rem',
        backgroundColor: '#f6f1c1',
        color: '#333',
        textDecoration: 'none',
        borderRadius: '6px',
        fontSize: '0.95rem',
        fontWeight: 500,
        border: '1px solid #e5dfac',
        transition: 'all 0.2s ease-in-out',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#f0e9a0'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#f6f1c1'
      }}
    >
      {text}
    </a>
  )
}
