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

  amplifierProcessor.params = newSoundParams.amplifier
  delayProcessor.params = newSoundParams.delay
  distortionProcessor.params = newSoundParams.distortion
  reverbProcessor.params = newSoundParams.reverb
  chorusProcessor.params = newSoundParams.chorus
}
