<template>
  <div :class="$style.root">
    <div :class="$style.knobWrapper">
      <h3>Gain: {{ gain }}</h3>
      <Knob v-model:effect-parameter="gain" :class="$style.knobInput" />
    </div>
    <div :class="$style.knobWrapper">
      <h3>Bass: {{ bass }}</h3>
      <Knob v-model:effect-parameter="bass" :class="$style.knobInput" />
    </div>
    <div :class="$style.knobWrapper">
      <h3>Mid: {{ mid }}</h3>
      <Knob v-model:effect-parameter="mid" :class="$style.knobInput" />
    </div>
    <div :class="$style.knobWrapper">
      <h3>Treble: {{ treble }}</h3>
      <Knob v-model:effect-parameter="treble" :class="$style.knobInput" />
    </div>
    <div :class="$style.knobWrapper">
      <h3>Master: {{ master }}</h3>
      <Knob v-model:effect-parameter="master" :class="$style.knobInput" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob/Knob.vue'
import { useAmplifier } from '@/composables/useAmplifier'
import { ref } from 'vue'

const { gain, bass, mid, treble } = useAmplifier()

//TODO: Create the master volume control logic after UI is developed
const master = ref(5.5)
</script>

<style module>
/* TODO: Adjust the UI for mobile/tablet resolutions */
.root {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  border: 5px solid burlywood;
  height: 250px;
  border-radius: 20px;
  width: 800px;
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
