<template>
  <EffectPedal title="Chorus Pedal" :class="$style.pedal" @toggle-power="togglePower">
    <div :class="sharedStyles.pedalContent">
      <h2>Rate: {{ rate }}</h2>
      <Knob v-model:effect-parameter="rate" />
      <h2>Depth: {{ depth }}</h2>
      <Knob v-model:effect-parameter="depth" />
    </div>
  </EffectPedal>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob/Knob.vue'
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import { ref } from 'vue'
import sharedStyles from '../shared.module.css'

const rate = ref(5.5)
const depth = ref(5.5)

const togglePower = (isPowerOn: boolean) => {
  console.log(isPowerOn)
}
</script>

<style module>
.pedal {
  border-color: lightcoral;
}
</style>
