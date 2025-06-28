<template>
  <div :class="$style.root">
    <div :class="$style.knobWrapper">
      <h3>Gain: {{ amplifier.gain }}</h3>
      <Knob v-model:effect-parameter="amplifier.gain" :class="$style.knobInput" />
    </div>
    <div :class="$style.knobWrapper">
      <h3>Bass: {{ amplifier.bass }}</h3>
      <Knob v-model:effect-parameter="amplifier.bass" :class="$style.knobInput" />
    </div>
    <div :class="$style.knobWrapper">
      <h3>Mid: {{ amplifier.mid }}</h3>
      <Knob v-model:effect-parameter="amplifier.mid" :class="$style.knobInput" />
    </div>
    <div :class="$style.knobWrapper">
      <h3>Treble: {{ amplifier.treble }}</h3>
      <Knob v-model:effect-parameter="amplifier.treble" :class="$style.knobInput" />
    </div>
    <div :class="$style.knobWrapper">
      <h3>Master: {{ master }}</h3>
      <Knob v-model:effect-parameter="master" :class="$style.knobInput" />
    </div>
    <div :class="$style.powerWrapper">
      <h3>Power</h3>
      <PowerButton @toggle-power="onPowerToggle" :class="$style.powerButton" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob/Knob.vue'
import PowerButton from '@/components/PowerButton'
import { useAmplifier } from '@/composables/useAmplifier'
import { ref } from 'vue'

const { amplifier } = useAmplifier()

const onPowerToggle = (isPowerOn: boolean) => {
  console.log(isPowerOn)
}

//TODO: Create the master volume control logic after UI is developed
const master = ref(amplifier.master)
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
