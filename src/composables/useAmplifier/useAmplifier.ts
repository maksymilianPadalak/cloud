import { createAmplifier, type AmplifierProcessor } from '@/processors/amplifierProcessor'
import { onMounted, onUnmounted } from 'vue'

export const useAmplifier = () => {
  const audioContext = new AudioContext()

  // Create amplifier processor immediately so params are available
  const amplifierProcessor: AmplifierProcessor = createAmplifier(audioContext)

  const getAudioInput = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
        },
      })
      .then((stream) => {
        const source = audioContext.createMediaStreamSource(stream)

        // Create mono processing chain
        const splitter = audioContext.createChannelSplitter(2)
        const merger = audioContext.createChannelMerger(2)
        const monoGain = audioContext.createGain()

        source.connect(splitter)
        splitter.connect(monoGain, 0)
        splitter.connect(monoGain, 1)
        monoGain.connect(merger, 0, 0)
        monoGain.connect(merger, 0, 1)

        // Connect audio chain: input -> amplifier -> output
        merger.connect(amplifierProcessor.inputNode)
        amplifierProcessor.outputNode.connect(audioContext.destination)
      })
  }

  onMounted(getAudioInput)

  onUnmounted(() => {
    amplifierProcessor.destroy()
    if (audioContext) {
      audioContext.close()
    }
  })

  return {
    amplifierProcessor,
  }
}
