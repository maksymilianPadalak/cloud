import { onMounted, onUnmounted, ref, watch } from 'vue'

export const useAudioInput = () => {
  let audioCtx: AudioContext | null = null
  let delay: DelayNode | null = null
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
        delay = audioCtx.createDelay(1.0)
        delay.delayTime.setValueAtTime(delayTime.value, audioCtx.currentTime)

        audioCtx.createMediaStreamSource(stream).connect(delay).connect(audioCtx.destination)
      })
  }

  watch(delayTime, (newValue) => {
    if (delay && audioCtx) {
      delay.delayTime.setValueAtTime(newValue, audioCtx.currentTime)
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
