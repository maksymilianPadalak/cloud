<template>
  <div>
    <div class="root">
      <h1>Delay Pedal</h1>
      <div class="pedalContent">
        <h2>Value: {{ effectParameter }}</h2>
        <Knob v-model:effect-parameter="effectParameter" class="knobInput" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob'

const effectParameter = defineModel('effectParameter', { default: 5.5, required: true })
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 5px solid lightblue;
  padding: 20px;
  height: 250px;
  border-radius: 20px;
}

.pedalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Investigate classes clashing */
.knobInput {
  margin: 20px;
}
</style>
