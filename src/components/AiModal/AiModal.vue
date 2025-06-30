<template>
  <!-- TODO: Close modal on escape key -->
  <div :class="$style.overlay" @click="emit('close')">
    <div :class="$style.modalContent" @click.stop>
      <button :class="$style.closeButton" @click="emit('close')">x</button>
      <h2 :class="$style.title">How would you like to sound?</h2>
      <hr :class="$style.horizontalLine" />
      <div :class="$style.inputWrapper">
        <h3>Describe your desired sound</h3>
        <textarea
          :class="$style.textarea"
          placeholder="e.g. I want to sound like David Gilmour from Pink Floyd"
          rows="10"
          v-model="prompt"
          @keydown.enter.stop.prevent="handleClick"
        />
        <button :class="$style.submitButton" @click="handleClick" :disabled="loading">
          {{ loading ? 'Loading...' : 'Submit' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAmplifier } from '@/composables/useAmplifier'
import { askGrok } from '@/utils/ai/askGrok/askGrok'
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { amplifierProcessor } = useAmplifier()

const loading = ref(false)
const prompt = ref('')

const handleClick = async () => {
  //TODO: handle errors
  loading.value = true
  const newAmplifierParams = await askGrok(prompt.value)
  loading.value = false

  amplifierProcessor.params.bass = newAmplifierParams.bass
  amplifierProcessor.params.mid = newAmplifierParams.mid
  amplifierProcessor.params.treble = newAmplifierParams.treble
  amplifierProcessor.params.gain = newAmplifierParams.gain

  emit('close')
}
</script>

<style module>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
}

.modalContent {
  position: absolute;
  min-width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  border: 5px solid black;
  z-index: 1001;
}

.closeButton {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  line-height: 0;
  font-size: 20px;
  font-weight: 600;
  border: 0px;
  background-color: transparent;
  border-radius: 50%;
  padding: 5px;
}

.title {
  margin: auto;
}

.horizontalLine {
  border: 1px solid lightblue;
  margin: 10px 0 20px 0;
}

.inputWrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.textarea {
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  font-family: inherit;
  resize: none;
}

.submitButton {
  background-color: lightblue;
  border: 2px solid black;
  border-radius: 5px;
  padding: 20px;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
}
</style>
