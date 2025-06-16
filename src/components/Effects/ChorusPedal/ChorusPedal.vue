<template>
  <EffectPedal title="Chorus Pedal">
    <div class="pedalContent">
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

const rate = ref(5.5)
const depth = ref(5.5)
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
