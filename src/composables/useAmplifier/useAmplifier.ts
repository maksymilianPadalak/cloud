import { createAmplifier, type AmplifierProcessor } from '@/processors/amplifierProcessor'
import { createReverb, type ReverbProcessor } from '@/processors/reverbProcessor'
import { onMounted, onUnmounted } from 'vue'

//TODO: rename it to useGuitarChain or anything like that

// Singleton instance - shared across all components
let sharedAudioContext: AudioContext | null = null
let sharedAmplifierProcessor: AmplifierProcessor | null = null
let sharedReverbProcessor: ReverbProcessor | null = null
let isAudioInputSetup = false
let componentCount = 0

export const useAmplifier = () => {
  // Create shared instances on first use
  if (!sharedAudioContext) {
    sharedAudioContext = new AudioContext()
    sharedAmplifierProcessor = createAmplifier(sharedAudioContext)
    sharedReverbProcessor = createReverb(sharedAudioContext)
  }

  const getAudioInput = () => {
    // Guard clause: Prevent duplicate audio setup and ensure required dependencies exist
    // - isAudioInputSetup: prevents multiple microphone streams from being created
    // - !sharedAudioContext || !sharedAmplifierProcessor: ensures shared resources are available
    if (
      isAudioInputSetup ||
      !sharedAudioContext ||
      !sharedAmplifierProcessor ||
      !sharedReverbProcessor
    )
      return

    isAudioInputSetup = true
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
        },
      })
      .then((stream) => {
        if (!sharedAudioContext || !sharedAmplifierProcessor || !sharedReverbProcessor) return

        const source = sharedAudioContext.createMediaStreamSource(stream)

        // Create mono processing chain
        const splitter = sharedAudioContext.createChannelSplitter(2)
        const merger = sharedAudioContext.createChannelMerger(2)
        const monoGain = sharedAudioContext.createGain()

        source.connect(splitter)
        splitter.connect(monoGain, 0)
        splitter.connect(monoGain, 1)
        monoGain.connect(merger, 0, 0)
        monoGain.connect(merger, 0, 1)

        // Connect audio chain: input -> amplifier -> output
        merger.connect(sharedReverbProcessor.inputNode)
        sharedReverbProcessor.outputNode.connect(sharedAmplifierProcessor.inputNode)
        sharedAmplifierProcessor.outputNode.connect(sharedAudioContext.destination)
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error)
        isAudioInputSetup = false
      })
  }

  onMounted(() => {
    componentCount++
    getAudioInput()
  })

  onUnmounted(() => {
    componentCount--

    // Only cleanup when the last component unmounts
    if (componentCount === 0) {
      if (sharedAmplifierProcessor) {
        sharedAmplifierProcessor.destroy()
        sharedAmplifierProcessor = null
      }
      if (sharedAudioContext) {
        sharedAudioContext.close()
        sharedAudioContext = null
      }
      isAudioInputSetup = false
    }
  })

  return {
    amplifierProcessor: sharedAmplifierProcessor!,
    reverbProcessor: sharedReverbProcessor!,
  }
}
