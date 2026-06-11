import { useEffect, useState, type ReactNode } from 'react'
import { slides } from './slides'
import hwLogo from '../../../brand/logos/hw-logo.svg'

const clamp = (n: number) => Math.max(0, Math.min(slides.length - 1, n))

function readHash(): { print: boolean; index: number } {
  const h = window.location.hash
  if (h.startsWith('#/print')) return { print: true, index: 0 }
  const n = Number.parseInt(h.replace(/^#\/?/, ''), 10)
  return { print: false, index: Number.isFinite(n) ? clamp(n) : 0 }
}

function Frame({ children, page }: { children: ReactNode; page: number }) {
  return (
    <div className="frame">
      {children}
      <span className="counter">
        {page + 1} / {slides.length}
      </span>
      <img className="wm" src={hwLogo} alt="" />
    </div>
  )
}

export function App() {
  const [{ print, index }, setNav] = useState(readHash)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const onHash = () => setNav(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const onResize = () =>
      setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720))
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (print) return
    const go = (i: number) => {
      window.location.hash = `#/${clamp(i)}`
    }
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) go(index + 1)
      else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) go(index - 1)
      else if (e.key === 'Home') go(0)
      else if (e.key === 'End') go(slides.length - 1)
      else if (e.key === 'f') {
        if (document.fullscreenElement) void document.exitFullscreen()
        else void document.documentElement.requestFullscreen()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [print, index])

  if (print) {
    return (
      <div className="print">
        {slides.map((slide, i) => (
          <Frame key={i} page={i}>
            {slide}
          </Frame>
        ))}
      </div>
    )
  }

  return (
    <div className="viewport">
      <div className="stage" style={{ transform: `scale(${scale})` }}>
        <Frame page={index}>{slides[index]}</Frame>
      </div>
    </div>
  )
}
