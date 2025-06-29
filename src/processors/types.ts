export type Processor<T> = {
  inputNode: AudioNode
  outputNode: AudioNode
  params: T
  destroy: () => void
}
