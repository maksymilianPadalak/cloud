<template>
  <EffectPedal title="Reverb Pedal" :class="$style.pedal" v-model:is-power-on="reverb.on">
    <div :class="sharedStyles.pedalContent">
      <div :class="sharedStyles.knobContainer">
        <h2>Decay: {{ reverb.decay }}</h2>
        <Knob v-model:effect-parameter="reverb.decay" />
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
import Knob from '@/components/Knob/Knob.vue'
import { useAmplifier } from '@/composables/useAmplifier'
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import { ref } from 'vue'
import sharedStyles from '../shared.module.css'

const { reverb } = useAmplifier()
const roomSize = ref(5.5)
const wet = ref(5.5)
const dry = ref(5.5)
</script>

<style module>
.pedal {
  border-color: lightskyblue;
}
</style>
