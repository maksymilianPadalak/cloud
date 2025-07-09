<template>
  <EffectPedal
    title="Chorus Pedal"
    :class="$style.pedal"
    v-model:is-power-on="chorusProcessor.params.on"
  >
    <div :class="sharedStyles.pedalContent">
      <div :class="sharedStyles.knobContainer">
        <h2>Rate: {{ chorusProcessor.params.rate }}</h2>
        <Knob v-model:effect-parameter="chorusProcessor.params.rate" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Depth: {{ chorusProcessor.params.depth }}</h2>
        <Knob v-model:effect-parameter="chorusProcessor.params.depth" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Wet: {{ chorusProcessor.params.wet }}</h2>
        <Knob v-model:effect-parameter="chorusProcessor.params.wet" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Dry: {{ chorusProcessor.params.dry }}</h2>
        <Knob v-model:effect-parameter="chorusProcessor.params.dry" />
      </div>
    </div>
  </EffectPedal>
</template>

<script setup lang="ts">
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import Knob from '@/components/Knob/Knob.vue'
import { useAmplifier } from '@/composables/useAmplifier/useAmplifier'
import sharedStyles from '../shared.module.css'

const { chorusProcessor } = useAmplifier()
</script>

<style module>
.pedal {
  border-color: lightcoral;
}
</style>
