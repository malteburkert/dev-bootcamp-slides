import { useEffect, useState, type ReactNode } from 'react'
import { StepContext } from './kit'
import { slides } from './slides'
import hwLogo from '../../../brand/logos/hw-logo.svg'
import alWave from '../../../brand/logos/alphalist-wave.png'
import alLogo from '../../../brand/logos/alphalist-logo.png'

type Def = { node: ReactNode; steps: number }

const defs: Def[] = slides.map((s) =>
  s !== null && typeof s === 'object' && 'node' in (s as Record<string, unknown>)
    ? (s as Def)
    : { node: s as ReactNode, steps: 0 },
)
const last = defs.length - 1
const clamp = (n: number) => Math.max(0, Math.min(last, n))

function readHash(): { print: boolean; index: number } {
  const h = window.location.hash
  if (h.startsWith('#/print')) return { print: true, index: 0 }
  const n = Number.parseInt(h.replace(/^#\/?/, ''), 10)
  return { print: false, index: Number.isFinite(n) ? clamp(n) : 0 }
}

function Frame({ children, page }: { children: ReactNode; page: number }) {
  return (
    <div className="frame">
      <img className="al-wave" src={alWave} alt="" />
      {children}
      <div className="al-header">
        <img src={alLogo} alt="alphalist" />
        <span>/ Developer Bootcamp</span>
      </div>
      <span className="location">Hamburg / 2026</span>
      <span className="counter">
        {page + 1} / {defs.length}
      </span>
      <img className="wm" src={hwLogo} alt="" />
    </div>
  )
}

export function App() {
  const [print, setPrint] = useState(() => readHash().print)
  const [pos, setPos] = useState(() => ({ index: readHash().index, step: 0 }))
  const [view, setView] = useState({ s: 1, w: 1280, h: 720 })

  /* external hash edits (typed URLs, links) */
  useEffect(() => {
    const onHash = () => {
      const h = readHash()
      setPrint(h.print)
      setPos((p) => (h.print || h.index === p.index ? p : { index: h.index, step: 0 }))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    /* fit-scale to 1280x720 density, then stretch the canvas to fill the viewport */
    const onResize = () => {
      const s = Math.min(window.innerWidth / 1280, window.innerHeight / 720)
      setView({ s, w: Math.ceil(window.innerWidth / s), h: Math.ceil(window.innerHeight / s) })
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* keyboard: arrows advance step reveals first, then slides */
  useEffect(() => {
    if (print) return
    const go = (index: number, step: number) => {
      setPos({ index, step })
      window.history.replaceState(null, '', `#/${index}`)
    }
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
        if (pos.step < defs[pos.index].steps) go(pos.index, pos.step + 1)
        else if (pos.index < last) go(pos.index + 1, 0)
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        if (pos.step > 0) go(pos.index, pos.step - 1)
        else if (pos.index > 0) go(pos.index - 1, defs[pos.index - 1].steps)
      } else if (e.key === 'Home') go(0, 0)
      else if (e.key === 'End') go(last, defs[last].steps)
      else if (e.key === 'f') {
        if (document.fullscreenElement) void document.exitFullscreen()
        else void document.documentElement.requestFullscreen()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [print, pos])

  if (print) {
    /* no StepContext provider: the default reveals everything */
    return (
      <div className="print">
        {defs.map((d, i) => (
          <Frame key={i} page={i}>
            {d.node}
          </Frame>
        ))}
      </div>
    )
  }

  return (
    <div className="viewport">
      <div className="stage" style={{ width: view.w, height: view.h, transform: `scale(${view.s})` }}>
        <Frame page={pos.index}>
          <StepContext.Provider value={pos.step}>
            <div className="slide-enter" key={pos.index}>
              {defs[pos.index].node}
            </div>
          </StepContext.Provider>
        </Frame>
      </div>
    </div>
  )
}
