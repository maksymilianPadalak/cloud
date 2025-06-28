<template>
  <div :class="$style.root">
    <div :class="$style.amplifierWrapper">
      <h2>Amplifier</h2>
      <Amplifier />
      <button @click="handleClick">Click me</button>
    </div>
    <!-- <PedalBoard /> -->
  </div>
</template>

<script setup lang="ts">
import Amplifier from '@/components/AmplifierUnit/AmplifierUnit.vue'
import { useAmplifier } from '@/composables/useAmplifier'
import { askGrok } from '@/utils/ai/askGrok/askGrok'

const { amplifierProcessor } = useAmplifier()

const handleClick = async () => {
  const newAmplifierParams = await askGrok('Make this sound like a bass guitar')
  console.log('newAmplifierParams:', newAmplifierParams)

  amplifierProcessor.params.bass = newAmplifierParams.bass
  amplifierProcessor.params.mid = newAmplifierParams.mid
  amplifierProcessor.params.treble = newAmplifierParams.treble
  amplifierProcessor.params.gain = newAmplifierParams.gain

  console.log('amplifierProcessor.params:', amplifierProcessor.params)
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
</style>
