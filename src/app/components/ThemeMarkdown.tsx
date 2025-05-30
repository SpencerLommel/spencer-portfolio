'use client'

import ReactMarkdown from 'react-markdown'
import ThemeAwareImage from './ThemeAwareImage'

export default function ThemeMarkdown({ content }: { content: string }) {
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
      }}
    >
      {content}
    </ReactMarkdown>
  )
}