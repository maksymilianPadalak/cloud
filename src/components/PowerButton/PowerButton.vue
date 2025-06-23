<template>
  <span
    :class="[$style.powerIcon, 'material-symbols-outlined', { [$style.isPowerOn]: isPowerOn }]"
    @click="isPowerOn = !isPowerOn"
  >
    power_settings_new
  </span>
</template>

<script setup lang="ts">
const isPowerOn = defineModel<boolean>('isPowerOn', { default: false })
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
    transform 0.2s ease;

  &.isPowerOn {
    background-color: lightcoral;
  }

  &:hover {
    transform: scale(1.05);
  }
}
</style>
