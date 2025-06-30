<template>
  <div :class="$style.root">
    <div :class="$style.amplifierWrapper">
      <h2>Amplifier</h2>
      <Amplifier />
    </div>
    <PedalBoard />
  </div>
</template>

<script setup lang="ts">
import Amplifier from '@/components/AmplifierUnit/AmplifierUnit.vue'
import PedalBoard from '@/components/PedalBoard/PedalBoard.vue'
</script>

<style module>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 100px;
  gap: 50px;
}

.amplifierWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.button {
  padding: 20px 20px;
  border-radius: 10px;
  background-color: #000;
  font-size: 24px;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.button:hover {
  background-color: #333;
}

.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
