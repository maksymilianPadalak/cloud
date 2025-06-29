<template>
  <div :class="$style.root">
    <div :class="$style.amplifierWrapper">
      <h2>Amplifier</h2>
      <Amplifier />
      <button :class="$style.button" @click="handleClick" :disabled="loading">
        {{ loading ? 'Loading...' : 'Click me' }}
      </button>
    </div>
    <PedalBoard />
  </div>
</template>

<script setup lang="ts">
import Amplifier from '@/components/AmplifierUnit/AmplifierUnit.vue'
import PedalBoard from '@/components/PedalBoard/PedalBoard.vue'
import { useAmplifier } from '@/composables/useAmplifier'
import { askGrok } from '@/utils/ai/askGrok/askGrok'
import { ref } from 'vue'

const { amplifierProcessor } = useAmplifier()

const loading = ref(false)

const handleClick = async () => {
  //TODO: handle errors
  loading.value = true
  const newAmplifierParams = await askGrok('Make this sound like a bass guitar')
  loading.value = false

  amplifierProcessor.params.bass = newAmplifierParams.bass
  amplifierProcessor.params.mid = newAmplifierParams.mid
  amplifierProcessor.params.treble = newAmplifierParams.treble
  amplifierProcessor.params.gain = newAmplifierParams.gain
}
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
