<template>
  <EffectPedal title="Distortion Pedal" :class="$style.pedal" @toggle-power="togglePower">
    <div :class="$style.pedalContent">
      <div>
        <h2>Drive: {{ drive }}</h2>
        <Knob v-model:effect-parameter="drive" />
      </div>

      <div>
        <h2>Tone: {{ tone }}</h2>
        <Knob v-model:effect-parameter="tone" />
      </div>

      <div>
        <h2>Wet: {{ wet }}</h2>
        <Knob v-model:effect-parameter="wet" />
      </div>

      <div>
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

.pedalContent {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
}
</style>
