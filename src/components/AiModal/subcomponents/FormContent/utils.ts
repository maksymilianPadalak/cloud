import { useAmplifier } from '@/composables/useAmplifier'
import type { GrokSoundResponse } from '@/utils/ai/askGrok/types'

export const updateProcessorsParams = (newSoundParams: GrokSoundResponse) => {
  const {
    amplifierProcessor,
    delayProcessor,
    distortionProcessor,
    reverbProcessor,
    chorusProcessor,
  } = useAmplifier()

  //TODO: read about Object.assign
  Object.assign(amplifierProcessor.params, newSoundParams.amplifier)
  Object.assign(delayProcessor.params, newSoundParams.delay)
  Object.assign(distortionProcessor.params, newSoundParams.distortion)
  Object.assign(reverbProcessor.params, newSoundParams.reverb)
  Object.assign(chorusProcessor.params, newSoundParams.chorus)
}
