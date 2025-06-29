import type { Processor } from '../types'

export type ReverbParams = {
  decay: number
  roomSize: number
  wet: number
  dry: number
  on: boolean
}

export type ReverbProcessor = Processor<ReverbParams>
