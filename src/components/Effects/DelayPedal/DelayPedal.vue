<template>
  <EffectPedal title="Delay Pedal">
    <div :class="sharedStyles.pedalContent">
      <h2>Time: {{ time }}</h2>
      <Knob v-model:effect-parameter="time" />
      <h2>Feedback: {{ feedback }}</h2>
      <Knob v-model:effect-parameter="feedback" />
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
</script>
