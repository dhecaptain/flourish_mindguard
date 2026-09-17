import type { SVGProps } from 'react'

type TuliaLogoProps = {
  compact?: boolean
  className?: string
}

export function TuliaLogo({ compact = false, className = '' }: TuliaLogoProps) {
  return (
    <span className={`tulia-logo ${compact ? 'tulia-logo-compact' : ''} ${className}`.trim()} aria-label="Tulia">
      <svg className="tulia-logo-mark" viewBox="0 0 40 40" role="img" aria-hidden="true">
        <path d="M20 34.5V18.8M20 22.5c-5.5-.2-9.2-3.3-9.6-8.9 5.6-.1 9.2 2.9 9.6 8.9Zm0-3.7c.5-6 4.1-9 9.6-8.9-.4 5.6-4.1 8.7-9.6 8.9Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
        <path d="M13 32.5c2.2 1.4 4.5 2.1 7 2.1s4.8-.7 7-2.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
      {!compact && <strong>tulia</strong>}
    </span>
  )
}


