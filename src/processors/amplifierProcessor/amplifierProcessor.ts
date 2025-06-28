import { reactive, watchEffect } from 'vue'
import type { AmplifierProcessor } from './types'
import { calculateEQValue, calculateGainValue, calculateMasterValue } from './utils'

export const createAmplifier = (audioContext: AudioContext): AmplifierProcessor => {
  const bassNode = audioContext.createBiquadFilter()
  const midNode = audioContext.createBiquadFilter()
  const trebleNode = audioContext.createBiquadFilter()
  const gainNode = audioContext.createGain()
  const masterNode = audioContext.createGain()

  bassNode.type = 'lowshelf'
  bassNode.frequency.setValueAtTime(200, audioContext.currentTime)

  midNode.type = 'peaking'
  midNode.frequency.setValueAtTime(1000, audioContext.currentTime)

  trebleNode.type = 'highshelf'
  trebleNode.frequency.setValueAtTime(4000, audioContext.currentTime)

  gainNode.connect(bassNode)
  bassNode.connect(midNode)
  midNode.connect(trebleNode)
  trebleNode.connect(masterNode)

  const params = reactive({
    gain: 5.5,
    bass: 5.5,
    mid: 5.5,
    treble: 5.5,
    master: 5.5,
    on: true,
  })

  const stopWatcher = watchEffect(() => {
    if (params.on) {
      gainNode.gain.setValueAtTime(calculateGainValue(params.gain), audioContext.currentTime)
      bassNode.gain.setValueAtTime(calculateEQValue(params.bass), audioContext.currentTime)
      midNode.gain.setValueAtTime(calculateEQValue(params.mid), audioContext.currentTime)
      trebleNode.gain.setValueAtTime(calculateEQValue(params.treble), audioContext.currentTime)
      masterNode.gain.setValueAtTime(calculateMasterValue(params.master), audioContext.currentTime)
    } else {
      masterNode.gain.setValueAtTime(0, audioContext.currentTime)
    }
  })

  return {
    inputNode: gainNode,
    outputNode: masterNode,
    params,
    destroy: () => {
      stopWatcher()
      gainNode.disconnect()
      bassNode.disconnect()
      midNode.disconnect()
      trebleNode.disconnect()
      masterNode.disconnect()
    },
  }
}
