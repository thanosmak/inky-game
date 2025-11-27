import { useCallback, useEffect, useRef } from 'react'
import { useGameStore } from './useGameStore'
import { storyManager } from '../story/StoryManager'

/**
 * useStory - Hook to access story state and actions
 * Initializes the story on first use
 */
export function useStory() {
  const { currentLines, currentChoices, tags, isStoryActive, canContinue } = useGameStore()
  const initialized = useRef(false)

  // Initialize story manager on mount
  useEffect(() => {
    if (!initialized.current) {
      storyManager.init()
      initialized.current = true
    }
  }, [])

  const continueStory = useCallback(() => {
    storyManager.continueStory()
  }, [])

  const choose = useCallback((index: number) => {
    storyManager.chooseChoiceIndex(index)
  }, [])

  const reset = useCallback(() => {
    storyManager.reset()
  }, [])

  const isEnded = storyManager.isEnded()

  return {
    currentLines,
    currentChoices,
    tags,
    isStoryActive,
    canContinue,
    isEnded,
    continueStory,
    choose,
    reset,
  }
}

