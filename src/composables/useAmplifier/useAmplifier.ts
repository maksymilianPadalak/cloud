import { onMounted, onUnmounted, ref, watchEffect } from 'vue'

export const useAmplifier = () => {
  const audioContext = new AudioContext()

  const gain = ref(1)
  const bass = ref(1)
  const mid = ref(1)
  const treble = ref(1)

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

        const bassNode = audioContext.createBiquadFilter()
        const midNode = audioContext.createBiquadFilter()
        const trebleNode = audioContext.createBiquadFilter()

        bassNode.type = 'lowshelf'
        bassNode.frequency.setValueAtTime(200, audioContext.currentTime)

        midNode.type = 'peaking'
        midNode.frequency.setValueAtTime(1000, audioContext.currentTime)

        trebleNode.type = 'highshelf'
        trebleNode.frequency.setValueAtTime(4000, audioContext.currentTime)

        const gainNode = audioContext.createGain()

        source.connect(bassNode)
        bassNode.connect(midNode)
        midNode.connect(trebleNode)
        trebleNode.connect(gainNode)
        gainNode.connect(audioContext.destination)

        watchEffect(() => {
          gainNode.gain.setValueAtTime(gain.value, audioContext.currentTime)

          if (bass.value > 0.5) bassNode.gain.setValueAtTime(20, audioContext.currentTime)
          else bassNode.gain.setValueAtTime(-20, audioContext.currentTime)

          if (mid.value > 0.5) midNode.gain.setValueAtTime(20, audioContext.currentTime)
          else midNode.gain.setValueAtTime(-20, audioContext.currentTime)

          if (treble.value > 0.5) trebleNode.gain.setValueAtTime(20, audioContext.currentTime)
          else trebleNode.gain.setValueAtTime(-20, audioContext.currentTime)
        })
      })
  }

  onMounted(getAudioInput)

  onUnmounted(() => {
    if (audioContext) {
      audioContext.close()
    }
  })

  return { gain, bass, mid, treble }
}
