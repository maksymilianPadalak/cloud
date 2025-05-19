export const delay = (audioContext: AudioContext, delayTime: number) => {
  const input = audioContext.createGain()

  const delay = audioContext.createDelay(1.0)
  delay.delayTime.setValueAtTime(delayTime, audioContext.currentTime)

  const delaySecond = audioContext.createDelay(2.0)
  delaySecond.delayTime.setValueAtTime(delayTime * 2, audioContext.currentTime)

  const merger = audioContext.createChannelMerger(2)

  input.connect(delay)
  input.connect(delaySecond)

  delay.connect(merger, 0, 0)
  delay.connect(merger, 0, 1)
  delaySecond.connect(merger, 0, 0)
  delaySecond.connect(merger, 0, 1)

  return { input, output: merger, delay, delaySecond }
}
