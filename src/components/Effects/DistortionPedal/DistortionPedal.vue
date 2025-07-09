<template>
  <EffectPedal
    title="Distortion Pedal"
    :class="$style.pedal"
    v-model:is-power-on="distortionProcessor.params.on"
  >
    <div :class="sharedStyles.pedalContent">
      <div :class="sharedStyles.knobContainer">
        <h2>Drive: {{ distortionProcessor.params.drive }}</h2>
        <Knob v-model:effect-parameter="distortionProcessor.params.drive" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Tone: {{ distortionProcessor.params.tone }}</h2>
        <Knob v-model:effect-parameter="distortionProcessor.params.tone" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Wet: {{ distortionProcessor.params.wet }}</h2>
        <Knob v-model:effect-parameter="distortionProcessor.params.wet" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Dry: {{ distortionProcessor.params.dry }}</h2>
        <Knob v-model:effect-parameter="distortionProcessor.params.dry" />
      </div>
    </div>
  </EffectPedal>
</template>

<script setup lang="ts">
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import Knob from '@/components/Knob/Knob.vue'
import { useAmplifier } from '@/composables/useAmplifier/useAmplifier'
import sharedStyles from '../shared.module.css'

const { distortionProcessor } = useAmplifier()
</script>

<style module>
.pedal {
  border-color: black;
}
</style>
