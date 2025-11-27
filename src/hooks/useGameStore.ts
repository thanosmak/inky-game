import { create } from 'zustand'

export interface Choice {
  text: string
  index: number
}

export interface StoryState {
  currentLines: string[]
  currentChoices: Choice[]
  tags: string[]
  isStoryActive: boolean
  canContinue: boolean
}

interface GameStore extends StoryState {
  setStoryState: (state: Partial<StoryState>) => void
  clearStory: () => void
}

const initialState: StoryState = {
  currentLines: [],
  currentChoices: [],
  tags: [],
  isStoryActive: false,
  canContinue: false,
}

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  setStoryState: (state) =>
    set((prev) => ({
      ...prev,
      ...state,
      isStoryActive: true,
    })),

  clearStory: () => set(initialState),
}))

