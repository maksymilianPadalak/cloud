<template>
  <div>
    <div class="root">
      <h2>{{ title }}</h2>
      <hr />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
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

hr {
  border-top: 3px solid lightblue;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
