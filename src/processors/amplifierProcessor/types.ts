export type AmplifierParams = {
  gain: number
  bass: number
  mid: number
  treble: number
  master: number
  on: boolean
}

export type AmplifierProcessor = {
  inputNode: AudioNode
  outputNode: AudioNode
  params: AmplifierParams
  destroy: () => void
}
