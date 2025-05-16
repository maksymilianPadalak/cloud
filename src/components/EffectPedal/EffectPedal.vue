<template>
  <div class="root">
    <h1>Delay Pedal</h1>
    <div class="delayPedalContent">
      <h2>Value: {{ eventParameterRef }}</h2>
      <input
        type="range"
        v-model="eventParameterRef"
        @input="handleInput"
        min="0"
        max="1"
        step="0.01"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ effectParameter: number }>()

const eventParameterRef = ref(props.effectParameter)

const emit = defineEmits<{ updateEffectParameter: [number] }>()

watch(
  () => props.effectParameter,
  (newValue) => {
    eventParameterRef.value = newValue
  },
)

const handleInput = () => {
  emit('updateEffectParameter', +eventParameterRef.value)
}
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

.delayPedalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
