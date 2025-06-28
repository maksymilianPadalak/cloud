import { createXai } from '@ai-sdk/xai'
import { generateText } from 'ai'
import { GROK_SYSTEM_PROMPT } from './constants'

export const askGrok = async (prompt: string) => {
  const xaiClient = createXai({
    apiKey: import.meta.env.VITE_XAI_API_KEY,
  })

  const { text } = await generateText({
    model: xaiClient('grok-3'),
    system: GROK_SYSTEM_PROMPT,
    prompt: prompt,
  })

  console.log(text)
}
