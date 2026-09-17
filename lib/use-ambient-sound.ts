'use client'

import { useCallback, useEffect, useRef } from 'react'

type Phase = 'Inhale' | 'Hold' | 'Exhale' | 'Rest'

export function useAmbientSound(phase: Phase, enabled = true, volume = 0.18) {
  const contextRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const enabledRef = useRef(enabled)
  enabledRef.current = enabled

  const start = useCallback(() => {
    if (!enabledRef.current) return
    const context = contextRef.current ?? new AudioContext()
    contextRef.current = context
    if (!gainRef.current) {
      const gain = context.createGain()
      const filter = context.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 900
      gain.gain.value = 0
      gain.connect(filter).connect(context.destination)
      gainRef.current = gain
      oscillatorsRef.current = [110, 164.8, 220].map((frequency) => {
        const oscillator = context.createOscillator()
        oscillator.type = 'sine'
        oscillator.frequency.value = frequency
        oscillator.detune.value = frequency === 164.8 ? -4 : 4
        oscillator.connect(gain)
        oscillator.start()
        return oscillator
      })
    }
    void context.resume()
  }, [])

  const stop = useCallback(() => {
    const gain = gainRef.current
    const context = contextRef.current
    if (!gain || !context) return
    gain.gain.cancelScheduledValues(context.currentTime)
    gain.gain.setTargetAtTime(0, context.currentTime, 0.4)
  }, [])

  const setEnabled = useCallback((value: boolean) => {
    enabledRef.current = value
    if (!value) stop()
  }, [stop])

  useEffect(() => {
    const context = contextRef.current
    const gain = gainRef.current
    if (!context || !gain || !enabled) return
    const target = phase === 'Inhale' ? volume : phase === 'Hold' ? volume * 0.8 : phase === 'Exhale' ? volume * 0.35 : volume * 0.08
    gain.gain.cancelScheduledValues(context.currentTime)
    gain.gain.linearRampToValueAtTime(target, context.currentTime + 0.8)
  }, [phase, enabled, volume])

  useEffect(() => () => { oscillatorsRef.current.forEach((oscillator) => oscillator.stop()); contextRef.current?.close() }, [])

  return { start, stop, setEnabled, setVolume: (_value: number) => undefined }
}
