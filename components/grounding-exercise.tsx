'use client'

import { useState } from 'react'
import { Eye, TouchpadIcon as Touch, Volume2, Sparkles, Coffee, Check, RotateCcw } from 'lucide-react'

const sensorySteps = [
  { count: 5, sense: 'SEE', icon: Eye, prompt: 'Acknowledge 5 things around you that you can see right now.', placeholder: 'e.g., A desk lamp, a green leaf, light on the wall...' },
  { count: 4, sense: 'TOUCH', icon: Touch, prompt: 'Acknowledge 4 things you can feel or touch.', placeholder: 'e.g., Soft sweater, cold coffee mug, feet on floor...' },
  { count: 3, sense: 'HEAR', icon: Volume2, prompt: 'Acknowledge 3 sounds you can hear in your environment.', placeholder: 'e.g., Distant traffic, hum of computer, birds outside...' },
  { count: 2, sense: 'SMELL', icon: Sparkles, prompt: 'Acknowledge 2 things you can smell (or memories of favorite scents).', placeholder: 'e.g., Fresh air, warm tea...' },
  { count: 1, sense: 'TASTE', icon: Coffee, prompt: 'Acknowledge 1 thing you can taste (or take a gentle sip of water).', placeholder: 'e.g., Cool mint, clean water...' },
]

export function GroundingExercise() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [inputs, setInputs] = useState<string[]>(Array(5).fill(''))
  const [isCompleted, setIsCompleted] = useState(false)

  const currentStep = sensorySteps[currentStepIndex]
  const Icon = currentStep.icon

  const handleNext = () => {
    if (currentStepIndex < sensorySteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handleReset = () => {
    setCurrentStepIndex(0)
    setInputs(Array(5).fill(''))
    setIsCompleted(false)
  }

  return (
    <div className="surface mood-card" style={{ padding: '28px' }}>
      <div className="section-kicker" style={{ marginBottom: '8px' }}>
        <Sparkles size={14} /> 5-4-3-2-1 GROUNDING TECHNIQUE
      </div>

      {isCompleted ? (
        <div style={{ textAlign: 'center', padding: '24px 12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e5efe2', color: '#355d46', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
            <Check size={24} />
          </div>
          <h2 style={{ font: '400 24px Georgia, serif', color: '#355542', margin: '0 0 8px' }}>
            You are grounded in this moment.
          </h2>
          <p style={{ fontSize: '13px', color: '#748078', maxWidth: '400px', margin: '0 auto 20px', lineHeight: 1.6 }}>
            Take one last slow breath. Notice how your body feels right now.
          </p>
          <button className="outline-button" style={{ marginTop: 0 }} onClick={handleReset}>
            <RotateCcw size={14} /> Practice Again
          </button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="activity-tag" style={{ fontSize: '11px', color: '#527b61' }}>
              STEP {currentStepIndex + 1} OF 5
            </span>
            <span style={{ fontSize: '12px', color: '#9aa69c' }}>{currentStep.count} items</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#e5f0e4', color: '#5e846a', display: 'grid', placeItems: 'center' }}>
              <Icon size={18} />
            </div>
            <h3 style={{ font: '600 18px Georgia, serif', color: '#355542', margin: 0 }}>
              Notice {currentStep.count} things you {currentStep.sense.toLowerCase()}
            </h3>
          </div>

          <p style={{ fontSize: '13px', color: '#748078', margin: '0 0 16px', lineHeight: 1.5 }}>
            {currentStep.prompt}
          </p>

          <textarea
            value={inputs[currentStepIndex]}
            onChange={(e) => {
              const newInputs = [...inputs]
              newInputs[currentStepIndex] = e.target.value
              setInputs(newInputs)
            }}
            placeholder={currentStep.placeholder}
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #dfe8dc',
              fontSize: '13px',
              color: '#355542',
              outline: 0,
              resize: 'none',
              marginBottom: '16px',
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            {currentStepIndex > 0 && (
              <button className="outline-button" style={{ marginTop: 0 }} onClick={() => setCurrentStepIndex((prev) => prev - 1)}>
                Back
              </button>
            )}
            <button className="primary-button" style={{ marginTop: 0 }} onClick={handleNext}>
              {currentStepIndex === sensorySteps.length - 1 ? 'Finish' : 'Next Step'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
