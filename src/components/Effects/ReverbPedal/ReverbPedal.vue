<template>
  <EffectPedal
    title="Reverb Pedal"
    :class="$style.pedal"
    v-model:is-power-on="reverbProcessor.params.on"
  >
    <div :class="sharedStyles.pedalContent">
      <div :class="sharedStyles.knobContainer">
        <h2>Decay: {{ reverbProcessor.params.decay }}</h2>
        <Knob v-model:effect-parameter="reverbProcessor.params.decay" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Room Size: {{ reverbProcessor.params.roomSize }}</h2>
        <Knob v-model:effect-parameter="reverbProcessor.params.roomSize" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Wet: {{ reverbProcessor.params.wet }}</h2>
        <Knob v-model:effect-parameter="reverbProcessor.params.wet" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Dry: {{ reverbProcessor.params.dry }}</h2>
        <Knob v-model:effect-parameter="reverbProcessor.params.dry" />
      </div>
    </div>
  </EffectPedal>
</template>

<script setup lang="ts">
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import Knob from '@/components/Knob/Knob.vue'
import { useAmplifier } from '@/composables/useAmplifier'
import sharedStyles from '../shared.module.css'

const { reverbProcessor } = useAmplifier()
</script>

<style module>
.pedal {
  border-color: lightskyblue;
}
</style>
