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
import { askGrok } from '@/utils/ai/askGrok/askGrok'
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
  //TODO: handle errors
  loading.value = true

  const interval = setInterval(() => {
    loadingDots.value = (loadingDots.value + 1) % 4
  }, 300)

  const newAmplifierParams = await askGrok(prompt.value)
  loading.value = false
  clearInterval(interval)

  amplifierProcessor.params.bass = newAmplifierParams.bass
  amplifierProcessor.params.mid = newAmplifierParams.mid
  amplifierProcessor.params.treble = newAmplifierParams.treble
  amplifierProcessor.params.gain = newAmplifierParams.gain

  emit('submit')
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
