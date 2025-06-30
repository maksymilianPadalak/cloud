<template>
  <EffectPedal
    title="Delay Pedal"
    :class="$style.pedal"
    v-model:is-power-on="delayProcessor.params.on"
  >
    <div :class="sharedStyles.pedalContent">
      <div :class="sharedStyles.knobContainer">
        <h2>Time: {{ delayProcessor.params.time }}</h2>
        <Knob v-model:effect-parameter="delayProcessor.params.time" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Feedback: {{ delayProcessor.params.feedback }}</h2>
        <Knob v-model:effect-parameter="delayProcessor.params.feedback" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Wet: {{ delayProcessor.params.wet }}</h2>
        <Knob v-model:effect-parameter="delayProcessor.params.wet" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Dry: {{ delayProcessor.params.dry }}</h2>
        <Knob v-model:effect-parameter="delayProcessor.params.dry" />
      </div>
    </div>
  </EffectPedal>
</template>

<script setup lang="ts">
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import Knob from '@/components/Knob/Knob.vue'
import { useAmplifier } from '@/composables/useAmplifier/useAmplifier'
import sharedStyles from '../shared.module.css'

const { delayProcessor } = useAmplifier()
</script>

<style module>
.pedal {
  border-color: lightseagreen;
}
</style>
