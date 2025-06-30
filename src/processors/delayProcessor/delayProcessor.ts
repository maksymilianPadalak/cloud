import { reactive, watchEffect } from 'vue'
import type { DelayParams, DelayProcessor } from './type'

export const createDelay = (audioContext: AudioContext): DelayProcessor => {
  const inputNode = audioContext.createGain()
  const dryNode = audioContext.createGain()
  const wetNode = audioContext.createGain()
  const delayNode = audioContext.createDelay(20)
  const outputNode = audioContext.createGain()

  inputNode.connect(dryNode)
  dryNode.connect(outputNode)

  inputNode.connect(delayNode)
  delayNode.connect(wetNode)
  wetNode.connect(outputNode)

  const params: DelayParams = reactive({
    time: 0.5,
    feedback: 0.5,
    wet: 3.0,
    dry: 8.0,
    on: false,
  })

  const stopWatcher = watchEffect(() => {
    delayNode.delayTime.value = params.time

    console.log(delayNode.delayTime.value)
    console.log(params.time)

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
      delayNode.disconnect()
      dryNode.disconnect()
      wetNode.disconnect()
      inputNode.disconnect()
      outputNode.disconnect()
      stopWatcher()
    },
  }
}
