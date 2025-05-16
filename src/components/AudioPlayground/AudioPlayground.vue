<template>
  <div class="root">
    <div class="delayPedal">
      <h1>Delay Pedal</h1>
      <div class="delayPedalContent">
        <input type="range" min="0" max="1" step="0.01" v-model="delayTime" />
        <h2>Value: {{ delayTime }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAudioInput } from '@/composables/useAudioInput'

const { delayTime } = useAudioInput()
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.delayPedal {
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

.delayPedalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
