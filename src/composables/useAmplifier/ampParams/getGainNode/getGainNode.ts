export const getGainNode = (audioContext: AudioContext, gain: number) => {
  const gainNode = audioContext.createGain()

  gainNode.gain.setValueAtTime(gain, audioContext.currentTime)

  return gainNode
}
