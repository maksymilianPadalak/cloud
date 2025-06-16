<template>
  <div>
    <div class="root">
      <div class="pedalContent">
        <h2>Decay: {{ reverb.decay }}</h2>
        <Knob v-model:effect-parameter="reverb.decay" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob/Knob.vue'
import { useAmplifier } from '@/composables/useAmplifier'

const { reverb } = useAmplifier()
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 5px solid lightgreen;
  padding: 40px;
  gap: 20px;
  border-radius: 20px;
  width: 300px;
  background-image: url('@/assets/images/bear.webp');
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}

.pedalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
</style>
