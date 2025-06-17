<template>
  <EffectPedal title="Reverb Pedal">
    <div :class="sharedStyles.pedalContent">
      <h2>Decay: {{ reverb.decay }}</h2>
      <Knob v-model:effect-parameter="reverb.decay" />
    </div>
  </EffectPedal>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob/Knob.vue'
import { useAmplifier } from '@/composables/useAmplifier'
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import sharedStyles from '../shared.module.css'

const { reverb } = useAmplifier()
</script>
