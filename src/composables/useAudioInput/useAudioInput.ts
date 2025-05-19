import { onMounted, onUnmounted, ref, watch } from 'vue'
import { delay } from './effects/delay'

export const useAudioInput = () => {
  let audioCtx: AudioContext | null = null
  let delayNode1: DelayNode | null = null
  let delayNode2: DelayNode | null = null

  const delayTime = ref(1)

  const getAudioInput = () => {
    return navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
        },
      })
      .then((stream) => {
        audioCtx = new AudioContext()

        const source = audioCtx.createMediaStreamSource(stream)
        const {
          input,
          output,
          delay: delayNode1Instance,
          delaySecond: delayNode2Instance,
        } = delay(audioCtx!, delayTime.value)

        delayNode1 = delayNode1Instance
        delayNode2 = delayNode2Instance

        source.connect(input)
        source.connect(audioCtx.destination)
        output.connect(audioCtx.destination)
      })
  }

  // Watch for changes and update delay times
  watch(delayTime, (val) => {
    if (delayNode1 && delayNode2 && audioCtx) {
      delayNode1.delayTime.setValueAtTime(val, audioCtx.currentTime)
      delayNode2.delayTime.setValueAtTime(val * 2, audioCtx.currentTime)
    }
  })

  onMounted(getAudioInput)
  onUnmounted(() => {
    if (audioCtx) {
      audioCtx.close()
    }
  })

  return { delayTime }
}
