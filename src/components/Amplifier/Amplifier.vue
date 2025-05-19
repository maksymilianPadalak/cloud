<template>
  <div>
    <div class="root">
      <div class="knobWrapper">
        <h3>Bass: {{ bass }}</h3>
        <Knob v-model:effect-parameter="bass" class="knobInput" />
      </div>
      <div class="knobWrapper">
        <h3>Mid: {{ mid }}</h3>
        <Knob v-model:effect-parameter="mid" class="knobInput" />
      </div>
      <div class="knobWrapper">
        <h3>Treble: {{ treble }}</h3>
        <Knob v-model:effect-parameter="treble" class="knobInput" />
      </div>
      <div class="knobWrapper">
        <h3>Gain: {{ gain }}</h3>
        <Knob v-model:effect-parameter="gain" class="knobInput" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob'
import { useAmplifier } from '@/composables/useAmplifier'

const { gain, bass, mid, treble } = useAmplifier()
</script>

<style scoped>
.root {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  border: 5px solid lightblue;
  height: 250px;
  border-radius: 20px;
  width: 600px;
  padding: 20px;
}

.knobWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.knobInput {
  margin: 10px;
}
</style>
