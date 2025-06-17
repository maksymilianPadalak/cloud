<template>
  <EffectPedal title="Reverb Pedal" :class="$style.pedal" @toggle-power="togglePower">
    <div :class="sharedStyles.pedalContent">
      <h2>Decay: {{ reverb.decay }}</h2>
      <Knob v-model:effect-parameter="reverb.decay" />
    </div>
  </EffectPedal>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob/Knob.vue'
import { useAmplifier } from '@/composables/useAmplifier'
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import sharedStyles from '../shared.module.css'

const { reverb } = useAmplifier()

const togglePower = (isPowerOn: boolean) => {
  console.log(isPowerOn)
}
</script>

<style module>
.pedal {
  border-color: lightskyblue;
}
</style>
