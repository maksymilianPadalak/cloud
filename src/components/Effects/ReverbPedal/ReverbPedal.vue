<template>
  <EffectPedal title="Reverb Pedal" :class="$style.pedal" @toggle-power="togglePower">
    <div :class="$style.pedalContent">
      <div>
        <h2>Decay: {{ reverb.decay }}</h2>
        <Knob v-model:effect-parameter="reverb.decay" />
      </div>

      <div>
        <h2>Room Size: {{ roomSize }}</h2>
        <Knob v-model:effect-parameter="roomSize" />
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
import { useAmplifier } from '@/composables/useAmplifier'
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import { ref } from 'vue'

const { reverb } = useAmplifier()
const roomSize = ref(5.5)
const wet = ref(5.5)
const dry = ref(5.5)

const togglePower = (isPowerOn: boolean) => {
  console.log(isPowerOn)
}
</script>

<style module>
.pedal {
  border-color: lightskyblue;
}

.pedalContent {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
}
</style>
