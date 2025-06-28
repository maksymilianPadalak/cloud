<template>
  <EffectPedal title="Reverb Pedal" :class="$style.pedal">
    <div :class="sharedStyles.pedalContent">
      <div :class="sharedStyles.knobContainer">
        <h2>Decay: {{ decay }}</h2>
        <Knob v-model:effect-parameter="decay" />
      </div>

      <div :class="sharedStyles.knobContainer">
        <h2>Room Size: {{ roomSize }}</h2>
        <Knob v-model:effect-parameter="roomSize" />
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
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import Knob from '@/components/Knob/Knob.vue'
import { ref } from 'vue'
import sharedStyles from '../shared.module.css'

const roomSize = ref(5.5)
const wet = ref(5.5)
const dry = ref(5.5)
const decay = ref(5.5)
</script>

<style module>
.pedal {
  border-color: lightskyblue;
}
</style>
