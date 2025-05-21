export const createImpulseResponse = (audioContext: AudioContext, decay: number = 2) => {
  const sampleRate = audioContext.sampleRate
  const length = Math.round(sampleRate * decay)

  const impulse = audioContext.createBuffer(2, length, sampleRate)
  const left = impulse.getChannelData(0)
  const right = impulse.getChannelData(1)

  for (let i = 0; i < length; i++) {
    const t = i / length
    const amplitude = Math.pow(1 - t, 3)
    left[i] = (Math.random() * 2 - 1) * amplitude
    right[i] = (Math.random() * 2 - 1) * amplitude
  }

  return impulse
}
