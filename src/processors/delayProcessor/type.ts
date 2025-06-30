import type { Processor } from '../types'

export type DelayParams = {
  time: number
  feedback: number
  wet: number
  dry: number
  on: boolean
}

export type DelayProcessor = Processor<DelayParams>
