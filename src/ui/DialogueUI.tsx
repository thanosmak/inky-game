interface DialogueUIProps {
  lines: string[]
}

/**
 * DialogueUI - Displays the current story lines
 */
export function DialogueUI({ lines }: DialogueUIProps) {
  if (lines.length === 0) {
    return null
  }

  return (
    <div className="dialogue">
      {lines.map((line, index) => (
        <p key={index} className="dialogue-line">
          {line}
        </p>
      ))}
    </div>
  )
}

