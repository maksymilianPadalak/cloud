<template>
  <div>
    <h2 :class="$style.title">How would you like to sound?</h2>
    <hr :class="$style.horizontalLine" />
    <div :class="$style.inputWrapper">
      <h3>Describe your desired sound</h3>
      <textarea
        :class="$style.textarea"
        placeholder="e.g. I want to sound like David Gilmour from Pink Floyd"
        rows="10"
        v-model="prompt"
        @keydown.enter.stop.prevent="handleEnterKey"
      />
      <button
        :class="[
          $style.submitButton,
          {
            [$style.disabled]: disabled,
          },
        ]"
        @click="submitForm"
        :disabled="disabled"
      >
        {{ loading ? `Loading${'.'.repeat(loadingDots)}` : 'Submit' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAmplifier } from '@/composables/useAmplifier'
import { askGrok } from '@/utils/ai/askGrok'
import { computed, ref } from 'vue'

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const { amplifierProcessor } = useAmplifier()

const loading = ref(false)
const prompt = ref('')
const disabled = computed(() => loading.value || prompt.value.length === 0)

const handleEnterKey = () => {
  if (!disabled.value) {
    submitForm()
  }
}

const loadingDots = ref(0)

const submitForm = async () => {
  loading.value = true

  const interval = setInterval(() => {
    loadingDots.value = (loadingDots.value + 1) % 4
  }, 300)

  try {
    const newSoundParams = await askGrok(prompt.value)

    // Set all amplifier parameters
    amplifierProcessor.params.bass = newSoundParams.amplifier.bass
    amplifierProcessor.params.mid = newSoundParams.amplifier.mid
    amplifierProcessor.params.treble = newSoundParams.amplifier.treble
    amplifierProcessor.params.gain = newSoundParams.amplifier.gain
    amplifierProcessor.params.master = newSoundParams.amplifier.master

    emit('submit')
  } catch (error) {
    console.error('Error getting sound parameters from AI:', error)
    // You could show a user-friendly error message here
    alert('Sorry, there was an error processing your request. Please try again.')
  } finally {
    loading.value = false
    clearInterval(interval)
  }
}
</script>

<style module>
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

.disabled {
  background-color: lightgray;
  cursor: not-allowed;
}
</style>
