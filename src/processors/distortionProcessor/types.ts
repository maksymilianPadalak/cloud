import type { Processor } from '../types'

export type DistortionParams = {
  on: boolean
  drive: number
  tone: number
  wet: number
  dry: number
}

export type DistortionProcessor = Processor<DistortionParams>
