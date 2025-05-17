import { onMounted, onUnmounted, ref, watch } from 'vue'

export const useAudioInput = () => {
  let audioCtx: AudioContext | null = null
  let delay: DelayNode | null = null
  let delaySecond: DelayNode | null = null
  let delayThird: DelayNode | null = null

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

        delaySecond = audioCtx.createDelay(2.0)
        delaySecond.delayTime.setValueAtTime(delayTime.value * 2, audioCtx.currentTime)

        delayThird = audioCtx.createDelay(3.0)
        delayThird.delayTime.setValueAtTime(delayTime.value * 3, audioCtx.currentTime)

        const source = audioCtx.createMediaStreamSource(stream)
        source.connect(delay)
        source.connect(delaySecond)
        source.connect(delayThird)
        delay.connect(audioCtx.destination)
        delaySecond.connect(audioCtx.destination)
        delayThird.connect(audioCtx.destination)
        source.connect(audioCtx.destination)
      })
  }

  watch(delayTime, (newValue) => {
    if (delay && audioCtx) {
      delay.delayTime.setValueAtTime(newValue, audioCtx.currentTime)
    }

    if (delaySecond && audioCtx) {
      delaySecond.delayTime.setValueAtTime(newValue * 2, audioCtx.currentTime)
    }

    if (delayThird && audioCtx) {
      delayThird.delayTime.setValueAtTime(newValue * 3, audioCtx.currentTime)
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
