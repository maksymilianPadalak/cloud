import { reactive, watchEffect } from 'vue'
import type { ReverbProcessor } from './types'
import { createImpulseResponse } from './utils'

export const createReverb = (audioContext: AudioContext): ReverbProcessor => {
  const inputNode = audioContext.createGain()
  const dryNode = audioContext.createGain()
  const wetNode = audioContext.createGain()
  const reverbNode = audioContext.createConvolver()
  const outputNode = audioContext.createGain()

  inputNode.connect(dryNode)
  dryNode.connect(outputNode)

  inputNode.connect(reverbNode)
  reverbNode.connect(wetNode)
  wetNode.connect(outputNode)

  const params = reactive({
    decay: 5.5,
    roomSize: 0.5,
    wet: 3.0,
    dry: 8.0,
    on: false,
  })

  const stopWatcher = watchEffect(() => {
    reverbNode.buffer = createImpulseResponse(audioContext, params.decay, params.roomSize)

    if (!params.on) {
      dryNode.gain.value = 1
      wetNode.gain.value = 0
    } else {
      wetNode.gain.value = params.wet / 11
      dryNode.gain.value = params.dry / 11
    }
  })

  return {
    inputNode: inputNode,
    outputNode: outputNode,
    params,
    destroy: () => {
      reverbNode.disconnect()
      dryNode.disconnect()
      wetNode.disconnect()
      inputNode.disconnect()
      outputNode.disconnect()
      stopWatcher()
    },
  }
}
