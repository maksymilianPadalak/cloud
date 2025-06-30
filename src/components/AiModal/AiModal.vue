<template>
  <!-- Modal closes on escape key -->
  <div :class="$style.overlay" @click="emit('close')">
    <div :class="$style.modalContent" @click.stop>
      <button :class="$style.closeButton" @click="emit('close')">x</button>
      <FormContent @submit="emit('close')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import FormContent from './subcomponents/FormContent'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<style module>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
}

.modalContent {
  position: absolute;
  min-width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  border: 5px solid black;
  z-index: 1001;
}

.closeButton {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  line-height: 0;
  font-size: 20px;
  font-weight: 600;
  border: 0px;
  background-color: transparent;
  border-radius: 50%;
  padding: 5px;
}
</style>
