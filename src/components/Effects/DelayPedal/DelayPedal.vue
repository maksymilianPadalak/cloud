<template>
  <EffectPedal v-model:effect-parameter="effectParameter" />
</template>

<script setup lang="ts">
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import { useAudioInput } from '@/composables/useAudioInput'
import { ref, watch } from 'vue'

const { delayTime } = useAudioInput()

const effectParameter = ref(delayTime.value)

watch(effectParameter, (newValue) => {
  delayTime.value = newValue
})
</script>
