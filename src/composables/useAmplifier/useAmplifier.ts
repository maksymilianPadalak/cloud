import { onMounted, onUnmounted, reactive, ref, watchEffect } from 'vue'

export const useAmplifier = () => {
  const audioContext = new AudioContext()
  let convolverNode: ConvolverNode

  const createImpulseResponse = (
    roomSize: number,
    duration: number,
    decay: number,
    materialAbsorption = 0.5,
  ) => {
    const sampleRate = audioContext.sampleRate
    const normalizedRoomSize = Math.max(0, Math.min(1, roomSize))
    const baseDuration = duration ?? 0.5 + normalizedRoomSize * 9.5
    const length = Math.round(sampleRate * baseDuration)
    const baseDecay = decay ?? (3 - normalizedRoomSize * 1.5) * (0.5 + materialAbsorption * 0.5)

    const impulse = audioContext.createBuffer(2, length, sampleRate)
    const left = impulse.getChannelData(0)
    const right = impulse.getChannelData(1)

    for (let i = 0; i < length; i++) {
      const n = length - i
      const t = n / length
      left[i] = (Math.random() * 2 - 1) * Math.pow(t, baseDecay)
      right[i] = (Math.random() * 2 - 1) * Math.pow(t, baseDecay)
    }

    return impulse
  }

  const gain = ref(5.5)
  const bass = ref(5.5)
  const mid = ref(5.5)
  const treble = ref(5.5)
  const reverb = reactive({ decayTime: 10, decayRate: 1, roomSize: 1 })

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

        convolverNode = audioContext.createConvolver()
        convolverNode.buffer = createImpulseResponse(10, 2, 1)

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
        trebleNode.connect(convolverNode)
        convolverNode.connect(audioContext.destination)
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

        watchEffect(() => {
          convolverNode.buffer = createImpulseResponse(
            reverb.decayTime,
            reverb.decayRate,
            reverb.roomSize,
          )
        })
      })
  }

  onMounted(getAudioInput)

  onUnmounted(() => {
    if (audioContext) {
      audioContext.close()
    }
  })

  return { gain, bass, mid, treble, reverb }
}
