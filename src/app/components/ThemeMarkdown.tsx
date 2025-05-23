'use client'

import ReactMarkdown from 'react-markdown'
import ThemeAwareImage from './ThemeAwareImage'

export default function ThemeMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        img: ({ node, src, alt, ...props }) => (
          <ThemeAwareImage
            src={src || ''}
            alt={alt || ''}
            width={800}
            height={400}
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              borderRadius: '8px'
            }}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}