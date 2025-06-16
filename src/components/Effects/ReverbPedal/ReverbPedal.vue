<template>
  <EffectPedal title="Reverb Pedal">
    <div class="pedalContent">
      <h2>Decay: {{ reverb.decay }}</h2>
      <Knob v-model:effect-parameter="reverb.decay" />
    </div>
  </EffectPedal>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob/Knob.vue'
import { useAmplifier } from '@/composables/useAmplifier'
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
const { reverb } = useAmplifier()
</script>

<style scoped>
.pedalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
</style>
