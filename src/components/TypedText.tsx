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
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const typeText = () => {
      const currentText = texts[currentTextIndex]
      
      if (isDeleting) {
        // Deleting
        if (currentCharIndex > 0) {
          setCurrentCharIndex(prev => prev - 1)
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }
      } else {
        // Typing
        if (currentCharIndex < currentText.length) {
          setCurrentCharIndex(prev => prev + 1)
        } else {
          // Text is complete, wait before starting to delete
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true)
          }, delay)
        }
      }
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout for next character
    timeoutRef.current = setTimeout(typeText, 
      isDeleting ? speed / 2 : speed
    )

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentTextIndex, currentCharIndex, isDeleting, texts, speed, delay])

  const currentText = texts[currentTextIndex]
  const displayedText = currentText.substring(0, currentCharIndex)
  
  return (
    <span className="inline-block">
      {displayedText}
      <span className="inline-block w-0.5 h-6 bg-matrix-green ml-1 animate-pulse"></span>
    </span>
  )
}

export default TypedText