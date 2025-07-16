import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AIConfig {
  provider: 'openai' | 'deepseek'
  apiKey: string
  model?: string
}

interface AIStore {
  config: AIConfig | null
  setConfig: (config: AIConfig) => void
  clearConfig: () => void
  hasValidConfig: () => boolean
}

export const useAIStore = create<AIStore>()(
  persist(
    (set, get) => ({
      config: null,
      setConfig: (config: AIConfig) => set({ config }),
      clearConfig: () => set({ config: null }),
      hasValidConfig: () => {
        const { config } = get()
        return !!(config && config.apiKey && config.provider)
      }
    }),
    {
      name: 'ai-config-storage',
      partialize: (state) => ({ config: state.config }),
    }
  )
)