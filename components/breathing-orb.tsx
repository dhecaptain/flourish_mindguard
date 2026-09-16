'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react'

type Phase = 'Inhale' | 'Hold' | 'Exhale' | 'Rest'

export function BreathingOrb() {
  const [activePattern, setActivePattern] = useState<'478' | 'box'>('478')
  const [isRunning, setIsRunning] = useState(false)
  const [phase, setPhase] = useState<Phase>('Inhale')
  const [secondsLeft, setSecondsLeft] = useState(4)

  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1

        // Switch phases
        if (activePattern === '478') {
          if (phase === 'Inhale') {
            setPhase('Hold')
            return 7
          } else if (phase === 'Hold') {
            setPhase('Exhale')
            return 8
          } else {
            setPhase('Inhale')
            return 4
          }
        } else {
          // Box breathing 4-4-4-4
          if (phase === 'Inhale') {
            setPhase('Hold')
            return 4
          } else if (phase === 'Hold') {
            setPhase('Exhale')
            return 4
          } else if (phase === 'Exhale') {
            setPhase('Rest')
            return 4
          } else {
            setPhase('Inhale')
            return 4
          }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning, phase, activePattern])

  const toggleRun = () => {
    if (!isRunning) {
      setPhase('Inhale')
      setSecondsLeft(4)
    }
    setIsRunning(!isRunning)
  }

  const reset = () => {
    setIsRunning(false)
    setPhase('Inhale')
    setSecondsLeft(4)
  }

  const getScale = () => {
    if (!isRunning) return 1
    if (phase === 'Inhale') return 1.4
    if (phase === 'Hold') return 1.4
    if (phase === 'Exhale') return 0.95
    return 1
  }

  const getDuration = () => {
    if (phase === 'Inhale') return activePattern === '478' ? '4s' : '4s'
    if (phase === 'Hold') return activePattern === '478' ? '7s' : '4s'
    if (phase === 'Exhale') return activePattern === '478' ? '8s' : '4s'
    return '4s'
  }

  return (
    <div className="surface mood-card" style={{ padding: '32px', textAlign: 'center' }}>
      <div className="section-kicker" style={{ justifyContent: 'center', marginBottom: '8px' }}>
        <Volume2 size={14} /> GUIDED BREATHWORK
      </div>
      <h2 style={{ font: '400 24px Georgia, serif', color: '#355542', margin: '0 0 16px' }}>
        Grounding Breathing Exercise
      </h2>

      {/* Pattern Selector */}
      <div className="filter-list" style={{ justifyContent: 'center', marginBottom: '28px' }}>
        <button
          className={activePattern === '478' ? 'filter-active' : ''}
          onClick={() => {
            setActivePattern('478')
            reset()
          }}
        >
          4-7-8 Relaxing
        </button>
        <button
          className={activePattern === 'box' ? 'filter-active' : ''}
          onClick={() => {
            setActivePattern('box')
            reset()
          }}
        >
          4-4-4-4 Box Breathing
        </button>
      </div>

      {/* Breathing Visual Orb */}
      <div style={{ height: '220px', display: 'grid', placeItems: 'center', position: 'relative' }}>
        <div
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'linear-gradient(140deg, #a9cdb0, #6e9b79)',
            boxShadow: '0 0 40px #54796135, inset 0 0 20px #ffffff77',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            transform: `scale(${getScale()})`,
            transition: `transform ${getDuration()} ease-in-out`,
          }}
        >
          <span style={{ font: '700 28px Georgia, serif', lineHeight: 1 }}>{secondsLeft}</span>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.1em', marginTop: '4px' }}>
            {isRunning ? phase : 'Ready'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
        <button className="primary-button" style={{ marginTop: 0 }} onClick={toggleRun}>
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
          {isRunning ? 'Pause' : 'Begin'}
        </button>
        <button className="outline-button" style={{ marginTop: 0 }} onClick={reset}>
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  )
}
