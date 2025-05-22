export const createImpulseResponse = (audioContext: AudioContext, decayTime: number = 5.5) => {
  const sampleRate = audioContext.sampleRate
  const totalLength = Math.round(sampleRate * decayTime)
  const impulse = audioContext.createBuffer(2, totalLength, sampleRate)
  const left = impulse.getChannelData(0)
  const right = impulse.getChannelData(1)

  const decayFactor = Math.pow(0.001, 1 / decayTime)

  for (let i = 0; i < totalLength; i++) {
    const t = i / sampleRate
    const amplitude = Math.pow(decayFactor, t)
    const swirl = Math.sin(t * 2 * Math.PI * 0.1)
    const noise = Math.random() * 2 - 1
    left[i] = noise * amplitude * (1 + 0.1 * swirl)
    right[i] = noise * amplitude * (1 - 0.1 * swirl)
  }

  return impulse
}
