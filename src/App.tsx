import { useEffect } from 'react'
import { ThreeScene } from './three/ThreeScene'
import { Overlay } from './ui/Overlay'
import { DialogueUI } from './ui/DialogueUI'
import { ChoiceList } from './ui/ChoiceList'
import { useStory } from './hooks/useStory'

function App() {
  const { currentLines, currentChoices, isStoryActive, isEnded, continueStory, choose } = useStory()

  // Start the story on mount
  useEffect(() => {
    if (!isStoryActive) {
      continueStory()
    }
  }, [isStoryActive, continueStory])

  return (
    <div className="app">
      <ThreeScene />

      <Overlay>
        {isEnded ? (
          <div className="dialogue">
            <p className="dialogue-line end-message">The story has ended.</p>
          </div>
        ) : (
          <>
            <DialogueUI lines={currentLines} />
            <ChoiceList choices={currentChoices} onChoose={choose} />
          </>
        )}
      </Overlay>
    </div>
  )
}

export default App

