<template>
  <EffectPedal v-model:effect-parameter="effectParameter" />
</template>

<script setup lang="ts">
import EffectPedal from '@/components/EffectPedal'
import { useAudioInput } from '@/composables/useAmplifier'
import { ref, watch } from 'vue'

const { delayTime } = useAudioInput()

const effectParameter = ref(delayTime.value)

watch(effectParameter, (newValue) => {
  delayTime.value = newValue
})
</script>
