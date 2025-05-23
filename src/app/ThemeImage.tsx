'use client'

import Image from 'next/image'
import { useTheme } from './context/ThemeContext'

interface ThemeImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  style?: React.CSSProperties
  priority?: boolean
  sizes?: string
}

export default function ThemeImage(props: ThemeImageProps) {
  const { theme } = useTheme()
  const { src, ...rest } = props
  
  // Handle theme-aware images
  const themeAwareSrc = src.startsWith('/assets/') && !src.includes('/light/') && !src.includes('/dark/')
    ? `/assets/${theme}${src.substring('/assets'.length)}`
    : src

  return <Image src={themeAwareSrc} {...rest} />
}