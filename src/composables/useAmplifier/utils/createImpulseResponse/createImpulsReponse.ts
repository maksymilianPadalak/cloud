export const createImpulseResponse = (
  audioContext: AudioContext,
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
