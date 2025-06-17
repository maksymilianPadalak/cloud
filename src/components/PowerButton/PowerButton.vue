<template>
  <span
    :class="[$style.powerIcon, 'material-symbols-outlined', { [$style.isPowerOn]: isPowerOn }]"
    @click="togglePower"
  >
    power_settings_new
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'togglePower', isPowerOn: boolean): void
}>()

const isPowerOn = ref(false)

const togglePower = () => {
  isPowerOn.value = !isPowerOn.value
  emit('togglePower', isPowerOn.value)
}
</script>

<style module>
.powerIcon {
  font-size: 50px;
  color: black;
  cursor: pointer;
  font-weight: 600;
  border-radius: 50%;
  border: 5px solid black;
  padding: 5px;
  background-color: lightgray;
  user-select: none;
  transition:
    background-color 0.2s ease,
    font-size 0.2s ease;

  &.isPowerOn {
    background-color: lightcoral;
  }

  &:hover {
    font-size: 55px;
  }
}
</style>
