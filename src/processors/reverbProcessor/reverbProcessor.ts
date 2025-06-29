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
    wet: 0.5,
    dry: 1,
    on: false,
  })

  const stopWatcher = watchEffect(() => {
    if (params.on) {
      reverbNode.buffer = createImpulseResponse(audioContext, params.decay)
      dryNode.gain.value = 0
      wetNode.gain.value = 1
    } else {
      dryNode.gain.value = 1
      wetNode.gain.value = 0
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
