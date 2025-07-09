import { createXai } from '@ai-sdk/xai'
import { generateText } from 'ai'
import { GROK_SYSTEM_PROMPT } from './constants'
import type { GrokSoundResponse } from './types'

export const askGrok = async (prompt: string): Promise<GrokSoundResponse> => {
  try {
    const xaiClient = createXai({
      apiKey: import.meta.env.VITE_XAI_API_KEY,
    })

    if (!import.meta.env.VITE_XAI_API_KEY) {
      throw new Error('XAI API key is not configured')
    }

    const { text } = await generateText({
      model: xaiClient('grok-3'),
      system: GROK_SYSTEM_PROMPT,
      prompt: prompt,
    })

    // Validate JSON before parsing
    let parsedResponse: GrokSoundResponse
    try {
      parsedResponse = JSON.parse(text) as GrokSoundResponse
    } catch (error) {
      console.error('Failed to parse AI response as JSON:', text, error)
      throw new Error('Invalid response format from AI')
    }

    return parsedResponse
  } catch (error) {
    console.error('Error in askGrok:', error)
    throw error
  }
}
