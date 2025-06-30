export const createImpulseResponse = (
  audioContext: AudioContext,
  decayTime: number = 5.5,
  roomSize: number = 0.5,
) => {
  const sampleRate = audioContext.sampleRate
  const totalLength = Math.round(sampleRate * decayTime)
  const impulse = audioContext.createBuffer(2, totalLength, sampleRate)
  const left = impulse.getChannelData(0)
  const right = impulse.getChannelData(1)

  const decayFactor = Math.pow(0.001, 1 / decayTime)

  // Use roomSize to affect the reverb characteristics
  const roomFactor = roomSize * 2 // Scale roomSize (0-1) to 0-2
  const earlyReflectionDelay = Math.floor(sampleRate * roomSize * 0.05) // Early reflections based on room size

  for (let i = 0; i < totalLength; i++) {
    const t = i / sampleRate
    const amplitude = Math.pow(decayFactor, t)

    // Add early reflections based on room size
    let earlyReflection = 0
    if (i > earlyReflectionDelay) {
      earlyReflection = Math.random() * 0.3 * roomFactor * amplitude
    }

    const swirl = Math.sin(t * 2 * Math.PI * 0.1 * roomFactor)
    const noise = Math.random() * 2 - 1

    left[i] = noise * amplitude * (1 + 0.1 * swirl) + earlyReflection
    right[i] = noise * amplitude * (1 - 0.1 * swirl) + earlyReflection
  }

  return impulse
}
