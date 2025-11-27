import { Choice } from '../hooks/useGameStore'

interface ChoiceListProps {
  choices: Choice[]
  onChoose: (index: number) => void
}

/**
 * ChoiceList - Renders available story choices as buttons
 */
export function ChoiceList({ choices, onChoose }: ChoiceListProps) {
  if (choices.length === 0) {
    return null
  }

  return (
    <div className="choices">
      {choices.map((choice) => (
        <button
          key={choice.index}
          className="choice-button"
          onClick={() => onChoose(choice.index)}
        >
          {choice.text}
        </button>
      ))}
    </div>
  )
}

