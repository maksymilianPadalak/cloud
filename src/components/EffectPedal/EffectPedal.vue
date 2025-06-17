<template>
  <div :class="$style.root">
    <h2>{{ title }}</h2>
    <hr :class="$style.separator" />
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style module>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
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
