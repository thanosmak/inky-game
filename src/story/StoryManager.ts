import { Story } from 'inkjs'
import { useGameStore, Choice } from '../hooks/useGameStore'
import storyContent from './story.json'

/**
 * StoryManager - Wraps inkjs Story and syncs state to Zustand store
 */
class StoryManager {
  private story: Story | null = null
  private initialized = false

  init() {
    if (this.initialized) return

    this.story = new Story(storyContent)
    this.initialized = true
  }

  /**
   * Continue the story until we hit choices or end
   * Collects all lines and updates the store
   */
  continueStory() {
    if (!this.story) {
      console.warn('StoryManager: Story not initialized')
      return
    }

    const lines: string[] = []
    const tags: string[] = []

    // Continue while we can, collecting text and tags
    while (this.story.canContinue) {
      const text = this.story.Continue()
      if (text && text.trim()) {
        lines.push(text.trim())
      }

      // Collect tags from this line
      const currentTags = this.story.currentTags
      if (currentTags && currentTags.length > 0) {
        tags.push(...currentTags)
      }
    }

    // Map choices to our format
    const choices: Choice[] = this.story.currentChoices.map((choice, index) => ({
      text: choice.text,
      index,
    }))

    // Update the store
    useGameStore.getState().setStoryState({
      currentLines: lines,
      currentChoices: choices,
      tags,
      canContinue: this.story.canContinue,
    })
  }

  /**
   * Select a choice by index and continue the story
   */
  chooseChoiceIndex(index: number) {
    if (!this.story) {
      console.warn('StoryManager: Story not initialized')
      return
    }

    if (index < 0 || index >= this.story.currentChoices.length) {
      console.warn('StoryManager: Invalid choice index', index)
      return
    }

    this.story.ChooseChoiceIndex(index)
    this.continueStory()
  }

  /**
   * Check if we've reached the end of the story
   */
  isEnded(): boolean {
    if (!this.story) return true
    return !this.story.canContinue && this.story.currentChoices.length === 0
  }

  /**
   * Reset the story to the beginning
   */
  reset() {
    if (this.story) {
      this.story.ResetState()
      useGameStore.getState().clearStory()
    }
  }
}

// Singleton instance
export const storyManager = new StoryManager()

