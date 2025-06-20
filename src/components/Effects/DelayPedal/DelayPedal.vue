<template>
  <EffectPedal title="Delay Pedal" :class="$style.pedal" @toggle-power="togglePower">
    <div :class="sharedStyles.pedalContent">
      <div :class="sharedStyles.knobContainer">
        <h2>Time: {{ time }}</h2>
        <Knob v-model:effect-parameter="time" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Feedback: {{ feedback }}</h2>
        <Knob v-model:effect-parameter="feedback" />
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

const time = ref(5.5)
const feedback = ref(5.5)
const wet = ref(5.5)
const dry = ref(5.5)

const togglePower = (isPowerOn: boolean) => {
  console.log(isPowerOn)
}
</script>

<style module>
.pedal {
  border-color: lightseagreen;
}
</style>
