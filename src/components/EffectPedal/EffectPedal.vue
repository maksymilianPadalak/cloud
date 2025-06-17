<template>
  <div :class="$style.root">
    <div>
      <h2>{{ title }}</h2>
      <hr :class="$style.separator" />
      <slot />
    </div>

    <!-- This is an incon loaded from Google Font
    https://fonts.google.com/icons?selected=Material+Symbols+Outlined:power_settings_new:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=Power&icon.size=24&icon.color=%231f1f1f -->
    <span
      :class="[$style.powerIcon, 'material-symbols-outlined', { [$style.isPowerOn]: isPowerOn }]"
      @click="togglePower"
    >
      power_settings_new
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
}>()

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
.root {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border: 5px solid lightblue;
  padding: 40px;
  border-radius: 20px;
  width: 300px;
  height: 500px;
}

.separator {
  border-top: 3px solid lightblue;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}

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
