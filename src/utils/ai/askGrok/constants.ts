//TODO add limits from pedals for other values than 0-11
export const GROK_SYSTEM_PROMPT = `Return only JSON file with the following structure: {
  "amplifier": {
    "gain": number in range 0-11,
    "bass": number in range 0-11,
    "mid": number in range 0-11,
    "treble": number in range 0-11,
    "master": number in range 0-11,
    "on": boolean
  },
  "delay": {
    "time": number,
    "feedback": number,
    "wet": number in range 0-11,
    "dry": number in range 0-11,
    "on": boolean
  },
  "reverb": {
    "decay": number,
    "roomSize": number,
    "wet": number in range 0-11,
    "dry": number in range 0-11,
    "on": boolean
  },
  "distortion": {
    "drive": number,
    "tone": number,
    "wet": number in range 0-11,
    "dry": number in range 0-11,
    "on": boolean
  },
  "chorus": {
    "rate": number,
    "depth": number,
    "wet": number in range 0-11,
    "dry": number in range 0-11,
    "on": boolean
  }
}`
