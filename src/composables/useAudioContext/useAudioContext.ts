import { onMounted, onUnmounted } from 'vue'
import { useAmplifier } from '../useAmplifier'

export const useAudioContext = () => {
  const audioContext = new AudioContext()
  // Initialize amplifier immediately with audio context
  const amplifier = useAmplifier(
    audioContext,
    audioContext.createChannelMerger(2),
    audioContext.destination,
  )

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

        const splitter = audioContext.createChannelSplitter(2)
        const merger = audioContext.createChannelMerger(2)
        const monoGain = audioContext.createGain()

        source.connect(splitter)
        splitter.connect(monoGain, 0)
        splitter.connect(monoGain, 1)
        monoGain.connect(merger, 0, 0)
        monoGain.connect(merger, 0, 1)

        // Connect merger to amplifier's input node
        merger.connect(amplifier.inputNode)
      })
  }

  onMounted(getAudioInput)

  onUnmounted(() => {
    if (audioContext) {
      audioContext.close()
    }
  })

  return { amplifier }
}
