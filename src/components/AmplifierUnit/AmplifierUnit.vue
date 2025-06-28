<template>
  <div :class="$style.root">
    <div :class="$style.knobWrapper">
      <h3>Gain: {{ amplifierProcessor.params.gain }}</h3>
      <Knob v-model:effect-parameter="amplifierProcessor.params.gain" :class="$style.knobInput" />
    </div>
    <div :class="$style.knobWrapper">
      <h3>Bass: {{ amplifierProcessor.params.bass }}</h3>
      <Knob v-model:effect-parameter="amplifierProcessor.params.bass" :class="$style.knobInput" />
    </div>
    <div :class="$style.knobWrapper">
      <h3>Mid: {{ amplifierProcessor.params.mid }}</h3>
      <Knob v-model:effect-parameter="amplifierProcessor.params.mid" :class="$style.knobInput" />
    </div>
    <div :class="$style.knobWrapper">
      <h3>Treble: {{ amplifierProcessor.params.treble }}</h3>
      <Knob v-model:effect-parameter="amplifierProcessor.params.treble" :class="$style.knobInput" />
    </div>
    <div :class="$style.knobWrapper">
      <h3>Master: {{ amplifierProcessor.params.master }}</h3>
      <Knob v-model:effect-parameter="amplifierProcessor.params.master" :class="$style.knobInput" />
    </div>
    <div :class="$style.powerWrapper">
      <h3>Power</h3>
      <PowerButton v-model:is-power-on="amplifierProcessor.params.on" :class="$style.powerButton" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob/Knob.vue'
import PowerButton from '@/components/PowerButton'
import { useAmplifier } from '@/composables/useAmplifier'

const { amplifierProcessor } = useAmplifier()
</script>

<style module>
/* TODO: Adjust the UI for mobile/tablet resolutions */
.root {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  border: 5px solid burlywood;
  height: 250px;
  border-radius: 20px;
  width: 900px;
  padding: 20px;
}

.knobWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.powerWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.knobInput {
  margin: 10px;
}

.powerButton {
  margin-top: 10px;
}
</style>
