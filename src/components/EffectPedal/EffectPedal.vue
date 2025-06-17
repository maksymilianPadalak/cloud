<template>
  <div :class="$style.root">
    <div>
      <h2>{{ title }}</h2>
      <hr :class="$style.separator" />
      <slot />
    </div>

    <PowerButton @toggle-power="onPowerToggle" />
  </div>
</template>

<script setup lang="ts">
import PowerButton from '@/components/PowerButton'

defineProps<{
  title: string
}>()

const emit = defineEmits<{
  (e: 'togglePower', isPowerOn: boolean): void
}>()

const onPowerToggle = (isPowerOn: boolean) => {
  emit('togglePower', isPowerOn)
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
</style>
