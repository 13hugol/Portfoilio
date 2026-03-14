import { useState, useEffect, useRef } from 'react'

interface TypedTextProps {
  texts: string[]
  speed?: number
  delay?: number
}

const TypedText = ({ texts, speed = 80, delay = 2000 }: TypedTextProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const typeText = () => {
      const currentText = texts[currentTextIndex]

      if (isDeleting) {
        if (currentCharIndex > 0) {
          setCurrentCharIndex(prev => prev - 1)
        } else {
          setIsDeleting(false)
          setCurrentTextIndex(prev => (prev + 1) % texts.length)
        }
      } else {
        if (currentCharIndex < currentText.length) {
          setCurrentCharIndex(prev => prev + 1)
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), delay)
          return
        }
      }
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(typeText, isDeleting ? speed / 2 : speed)

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [currentTextIndex, currentCharIndex, isDeleting, texts, speed, delay])

  const displayedText = texts[currentTextIndex].substring(0, currentCharIndex)

  return (
    <span className="inline-block">
      {displayedText}
      <span className="inline-block w-0.5 h-6 bg-matrix-green-primary ml-1 animate-pulse" />
    </span>
  )
}

export default TypedText
