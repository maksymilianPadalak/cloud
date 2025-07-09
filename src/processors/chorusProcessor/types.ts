import type { Processor } from '../types'

export type ChordParams = {
  on: boolean
  rate: number
  depth: number
  wet: number
  dry: number
}

export type ChorusProcessor = Processor<ChordParams>
