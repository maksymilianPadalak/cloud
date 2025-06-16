<template>
  <div>
    <div class="root">
      <div class="pedalContent">
        <h2>Rate: {{ rate }}</h2>
        <Knob v-model:effect-parameter="rate" />
        <h2>Depth: {{ depth }}</h2>
        <Knob v-model:effect-parameter="depth" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob/Knob.vue'
import { ref } from 'vue'

const rate = ref(5.5)
const depth = ref(5.5)
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 5px solid lightblue;
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
