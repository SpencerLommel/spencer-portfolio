'use client'

import Image from 'next/image'
import { useTheme } from '../context/ThemeContext'

interface ThemeAwareImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  style?: React.CSSProperties
}

export default function ThemeAwareImage(props: ThemeAwareImageProps) {
  const { theme } = useTheme()
  const { src, ...rest } = props

  const themeAwareSrc = src.includes('/assets/') 
    ? src.replace('/assets/', `/assets/${theme}/`)
    : src

  return (
    <Image
      src={themeAwareSrc}
      {...rest}
    />
  )
}