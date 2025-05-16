import { ref, onUnmounted, onMounted } from 'vue'

const VOLUME_THRESHOLD = 130

const getFrequency = (
  analyser: AnalyserNode,
  dataArray: Uint8Array,
  bufferLength: number,
  audioCtx: AudioContext,
  frequency: ReturnType<typeof ref>,
  setAnimationFrameId: (id: number) => void,
) => {
  analyser.getByteFrequencyData(dataArray)

  let maxAmplitude = 0
  let maxIndex = 0
  for (let i = 0; i < bufferLength; i++) {
    if (dataArray[i] > maxAmplitude) {
      maxAmplitude = dataArray[i]
      maxIndex = i
    }
  }

  if (maxAmplitude > VOLUME_THRESHOLD) {
    const freq = (maxIndex * audioCtx.sampleRate) / analyser.fftSize

    frequency.value = Math.round(freq * 100) / 100
  } else {
    frequency.value = null
  }

  const animationFrameId = requestAnimationFrame(() =>
    getFrequency(analyser, dataArray, bufferLength, audioCtx, frequency, setAnimationFrameId),
  )

  setAnimationFrameId(animationFrameId)
}

export const useMicFrequency = () => {
  const frequency = ref<number | null>(null)
  let audioCtx: AudioContext | null = null
  let stream: MediaStream | null = null
  let animationFrameId: number | null = null

  const setAnimationFrameId = (id: number) => {
    animationFrameId = id
  }

  const startMic = () => {
    try {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((mediaStream) => {
        stream = mediaStream

        audioCtx = new AudioContext()
        const source = audioCtx.createMediaStreamSource(stream)
        const analyser = audioCtx.createAnalyser()
        analyser.fftSize = 2048
        source.connect(analyser)
        const bufferLength = analyser.frequencyBinCount

        const dataArray = new Uint8Array(bufferLength)

        console.log('1', dataArray)

        getFrequency(analyser, dataArray, bufferLength, audioCtx, frequency, setAnimationFrameId)
      })
    } catch (err) {
      console.error('Error accessing microphone:', err)
    }
  }

  const cleanup = () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    if (audioCtx) {
      audioCtx.close()
    }
  }

  onMounted(startMic)
  onUnmounted(cleanup)

  return frequency
}
