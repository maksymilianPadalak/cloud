import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'

export const useAmplifier = () => {
  const audioContext = new AudioContext()

  const gain = ref(5.5)
  const bass = ref(5.5)
  const mid = ref(5.5)
  const treble = ref(5.5)

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

        const calculateGainValue = (value: number) => {
          if (value === 0) {
            return 0
          } else if (value < 5.5) {
            return value / 5.5
          } else {
            return (value / 11) * 5
          }
        }

        const calculateEQValue = (value: number) => {
          if (value === 0) {
            return -40
          } else if (value < 5.5) {
            return (value - 5.5) * 2
          } else if (value > 5.5) {
            return (value - 5.5) * 2
          } else {
            return 0
          }
        }

        watchEffect(() => {
          gainNode.gain.setValueAtTime(calculateGainValue(gain.value), audioContext.currentTime)
          bassNode.gain.setValueAtTime(calculateEQValue(bass.value), audioContext.currentTime)
          midNode.gain.setValueAtTime(calculateEQValue(mid.value), audioContext.currentTime)
          trebleNode.gain.setValueAtTime(calculateEQValue(treble.value), audioContext.currentTime)
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
