'use client'

import Image from 'next/image'
import { useState } from 'react'

type SafeImageProps = React.ComponentProps<typeof Image> & {
  fallback?: string
}

export default function SafeImage({ fallback = '/vercel.svg', src, alt, ...rest }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt}
      unoptimized
      onError={() => setCurrentSrc(fallback)}
    />
  )
}
