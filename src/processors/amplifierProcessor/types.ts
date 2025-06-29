import type { Processor } from '../types'

export type AmplifierParams = {
  gain: number
  bass: number
  mid: number
  treble: number
  master: number
  on: boolean
}

export type AmplifierProcessor = Processor<AmplifierParams>
