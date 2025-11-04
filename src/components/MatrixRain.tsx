import { useEffect, useRef } from 'react'

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Matrix characters - including Devanagari and tech symbols
    const chars = 'ᛃᛇᛋᛏᛒᛗᛞᚨᚱᚲᚷᚺᚾᚾᛇᛉᚹᚾᛗᛏᛒᛖᛏᛗᛝᚠᚢᚥᛃᛏᛒᛗᛞᚠᚢᚥᛃᛏᛒᛖᛏᛗᛝᛁᛜᛟᛞᛟᛟᚠᚢᚥᛃᛏᛒᛖᛏᛗᛝᛁᛜᛟᛞᛟᛟᛁᛜᛟᛞᛟᛟᛁᛜᛟᛞᛟᛟ'
    const charsArray = chars.split('')

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = new Array(columns).fill(1)

    const draw = () => {
      // Create fading effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text properties
      ctx.fillStyle = '#00FF41'
      ctx.font = `${fontSize}px JetBrains Mono, monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character from the array
        const text = charsArray[Math.floor(Math.random() * charsArray.length)]
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Reset drop randomly or if it goes off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 100)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-15"
      style={{ background: 'transparent' }}
    />
  )
}

export default MatrixRain