'use client'

import { useEffect } from 'react'
import Nav from './nav'
import MyFooter from './footer'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      <div className="content-container">
        <Nav />
        
        <div style={{ marginTop: '2rem' }}>
          <h3>
            Hello and welcome! My name is Spencer Lommel, I mostly program in C, C++, Go, and sometimes Python when needed, so I don't
            really do a lot of web development :P
          </h3>

          <p>
            I was working on a pretty cool embedded Linux project and I
            got a lot of questions online about it so I decided to make
            this page. Check out the project <a href="#">here!</a>
          </p>

          <p>
            I am a CS Major at NDSU, and a Systems Programmer Intern at Marvin
            Windows. I really like hardware reverse engineering and working with
            microcontrollers! Check out my Github or Projects tab to see more of what I
            like to make! :-)
          </p>

          <p>
            while you're here check out my projects tab as well! Also test out the light/dark mode I made a custom component that supports images too!          </p>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <SoftButton href="https://github.com/SpencerLommel" text="GitHub" />
            <SoftButton 
              href="https://www.linkedin.com/in/spencer-lommel" 
              text="LinkedIn" 
            />
          </div>
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
