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
      <h3>Ai</h3>
      <MusicUnitButton
        :class="$style.aiButton"
        material-symbols-name="network_intelligence"
        @click="isAiModalOpen = true"
      />
    </div>
    <div :class="$style.powerWrapper">
      <h3>Power</h3>
      <PowerButton v-model:is-power-on="amplifierProcessor.params.on" :class="$style.powerButton" />
    </div>
    <AiModal v-if="isAiModalOpen" @close="isAiModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
import AiModal from '@/components/AiModal'
import Knob from '@/components/Knob/Knob.vue'
import MusicUnitButton from '@/components/MusicUnitButton'
import PowerButton from '@/components/PowerButton'

import { useAmplifier } from '@/composables/useAmplifier'
import { ref } from 'vue'

const isAiModalOpen = ref(false)
const { amplifierProcessor } = useAmplifier()
</script>

<style module>
/* TODO: Adjust the UI for mobile/tablet resolutions */
.root {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
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

.powerButton,
.aiButton {
  margin-top: 10px;
}

.aiButton {
  background-color: lightblue;
}
</style>
