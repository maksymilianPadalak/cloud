<template>
  <div>
    <div class="root">
      <div class="pedalContent">
        <h2>Time: {{ time }}</h2>
        <Knob v-model:effect-parameter="time" />
        <h2>Feedback: {{ feedback }}</h2>
        <Knob v-model:effect-parameter="feedback" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob/Knob.vue'
import { ref } from 'vue'

const time = ref(5.5)
const feedback = ref(5.5)
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
