export type GrokSoundResponse = {
  amplifier: {
    gain: number
    bass: number
    mid: number
    treble: number
    master: number
    on: boolean
  }
  delay: {
    time: number
    feedback: number
    wet: number
    dry: number
    on: boolean
  }
  reverb: {
    decay: number
    roomSize: number
    wet: number
    dry: number
    on: boolean
  }
  distortion: {
    drive: number
    tone: number
    wet: number
    dry: number
    on: boolean
  }
  chorus: {
    rate: number
    depth: number
    wet: number
    dry: number
    on: boolean
  }
}
