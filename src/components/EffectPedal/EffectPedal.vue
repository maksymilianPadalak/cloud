<template>
  <div>
    <div class="root">
      <h1>Delay Pedal</h1>
      <div class="pedalContent">
        <h2>Value: {{ effectParameter }}</h2>
        <Knob v-model:effect-parameter="effectParameter" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Knob from './Knob'

const effectParameter = defineModel('effectParameter', { default: 1, required: true })
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 5px solid lightblue;
  margin: 100px;
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
</style>
