<template>
  <EffectPedal title="Distortion Pedal" :class="$style.pedal" @toggle-power="togglePower">
    <div :class="sharedStyles.pedalContent">
      <div :class="sharedStyles.knobContainer">
        <h2>Drive: {{ drive }}</h2>
        <Knob v-model:effect-parameter="drive" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Tone: {{ tone }}</h2>
        <Knob v-model:effect-parameter="tone" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Wet: {{ wet }}</h2>
        <Knob v-model:effect-parameter="wet" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Dry: {{ dry }}</h2>
        <Knob v-model:effect-parameter="dry" />
      </div>
    </div>
  </EffectPedal>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob/Knob.vue'
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import { ref } from 'vue'
import sharedStyles from '../shared.module.css'

const drive = ref(5.5)
const tone = ref(5.5)
const wet = ref(5.5)
const dry = ref(5.5)

const togglePower = (isPowerOn: boolean) => {
  console.log(isPowerOn)
}
</script>

<style module>
.pedal {
  border-color: black;
}
</style>
