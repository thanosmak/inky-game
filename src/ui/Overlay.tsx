import { ReactNode } from 'react'

interface OverlayProps {
  children: ReactNode
}

/**
 * Overlay - Fixed position container at the bottom of the screen
 * Houses dialogue and choice UI
 */
export function Overlay({ children }: OverlayProps) {
  return (
    <div className="overlay">
      <div className="overlay-content">
        {children}
      </div>
    </div>
  )
}

