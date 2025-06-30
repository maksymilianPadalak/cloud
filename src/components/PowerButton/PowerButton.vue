<template>
  <MusicUnitButton
    material-symbols-name="power_settings_new"
    :class="{ [$style.isPowerOn]: isPowerOn }"
    @click="isPowerOn = !isPowerOn"
  />
</template>

<script setup lang="ts">
import MusicUnitButton from '@/components/MusicUnitButton'

const isPowerOn = defineModel<boolean>('isPowerOn', { default: false })
</script>

<style module>
.isPowerOn {
  background-color: lightcoral;
}
</style>
