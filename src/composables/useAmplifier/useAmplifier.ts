import { createAmplifier, type AmplifierProcessor } from '@/processors/amplifierProcessor'
import type { ChorusProcessor } from '@/processors/chorusProcessor'
import { createDelay } from '@/processors/delayProcessor'
import type { DelayProcessor } from '@/processors/delayProcessor/type'
import type { DistortionProcessor } from '@/processors/distortionProcessor'
import { createReverb, type ReverbProcessor } from '@/processors/reverbProcessor'
import { onMounted, onUnmounted } from 'vue'

//TODO: rename it to useGuitarChain or anything like that

// Singleton instance - shared across all components
let sharedAudioContext: AudioContext | null = null
let sharedAmplifierProcessor: AmplifierProcessor | null = null
let sharedReverbProcessor: ReverbProcessor | null = null
let sharedDelayProcessor: DelayProcessor | null = null

//TODO: replace it with real processor
const mockedChorusProcessor: ChorusProcessor = {
  inputNode: new GainNode(new AudioContext()),
  outputNode: new GainNode(new AudioContext()),
  params: {
    on: false,
    rate: 5.5,
    depth: 5.5,
    wet: 5.5,
    dry: 5.5,
  },
  destroy: () => {},
}

//TODO: replace it with real processor
const mockedDistortionProcessor: DistortionProcessor = {
  inputNode: new GainNode(new AudioContext()),
  outputNode: new GainNode(new AudioContext()),
  params: {
    on: false,
    drive: 5.5,
    tone: 5.5,
    wet: 5.5,
    dry: 5.5,
  },
  destroy: () => {},
}

let isAudioInputSetup = false
let componentCount = 0

export const useAmplifier = () => {
  // Create shared instances on first use
  if (!sharedAudioContext) {
    sharedAudioContext = new AudioContext()
    sharedAmplifierProcessor = createAmplifier(sharedAudioContext)
    sharedReverbProcessor = createReverb(sharedAudioContext)
    sharedDelayProcessor = createDelay(sharedAudioContext)
  }

  const getAudioInput = () => {
    // Guard clause: Prevent duplicate audio setup and ensure required dependencies exist
    // - isAudioInputSetup: prevents multiple microphone streams from being created
    // - !sharedAudioContext || !sharedAmplifierProcessor: ensures shared resources are available
    if (
      isAudioInputSetup ||
      !sharedAudioContext ||
      !sharedAmplifierProcessor ||
      !sharedReverbProcessor ||
      !sharedDelayProcessor
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
        if (
          !sharedAudioContext ||
          !sharedAmplifierProcessor ||
          !sharedReverbProcessor ||
          !sharedDelayProcessor
        )
          return

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
        sharedAmplifierProcessor.outputNode.connect(sharedDelayProcessor.inputNode)
        sharedDelayProcessor.outputNode.connect(sharedAudioContext.destination)
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

  //TODO: remove non-null assertions
  return {
    amplifierProcessor: sharedAmplifierProcessor!,
    reverbProcessor: sharedReverbProcessor!,
    delayProcessor: sharedDelayProcessor!,
    chorusProcessor: mockedChorusProcessor,
    distortionProcessor: mockedDistortionProcessor,
  }
}
