<template>
  <!-- TODO: Close modal on escape key -->
  <div :class="$style.overlay" @click="emit('close')">
    <div :class="$style.aiModalContent">
      <button :class="$style.aiModalContentCloseButton" @click="emit('close')">x</button>
      <h2>How would you like to sound? Please describe your desired sound.</h2>
      <hr :class="$style.horizontalLine" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()
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

.aiModalContent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  border: 5px solid black;
}

.aiModalContentCloseButton {
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

.horizontalLine {
  border: 1px solid lightblue;
  margin: 10px 0;
}
</style>
