'use client'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from '../context/ThemeContext'
import ThemeAwareImage from './ThemeAwareImage'

export default function ThemeMarkdown({ content }: { content: string }) {
  const { theme } = useTheme()

  return (
    <ReactMarkdown
      components={{
        img: ({ node, src, alt, ...props }) => (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            margin: '2rem 0',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <ThemeAwareImage
              src={typeof src === 'string' ? src : ''}
              alt={alt || ''}
              width={1920}
              height={1080}
              quality={100}
              priority
              style={{ 
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </div>
        ),
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          const code = String(children).replace(/\n$/, '')

          if (!inline && match) {
            return (
              <div style={{ position: 'relative' }}>
                <SyntaxHighlighter
                  style={theme === 'dark' ? oneDark : oneLight}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: '1.5em 0',
                    borderRadius: '8px',
                    padding: '1em',
                    fontSize: '0.9em',
                  }}
                  showLineNumbers={true}
                  {...props}
                >
                  {code}
                </SyntaxHighlighter>
                <button
                  onClick={() => navigator.clipboard.writeText(code)}
                  className="copy-button"
                  aria-label="Copy code"
                >
                  📋
                </button>
              </div>
            )
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}