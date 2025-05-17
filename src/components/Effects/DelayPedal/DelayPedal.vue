<template>
  <EffectPedal v-model:effect-parameter="effectParameter" />
</template>

<script setup lang="ts">
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import { useAudioInput } from '@/composables/useAudioInput'
import { useDelayStore } from '@/stores/delayStore'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const store = useDelayStore()

const { delayTime } = storeToRefs(store)
const { changeDelayTime } = store
const effectParameter = ref(delayTime.value)

watch(effectParameter, (newValue) => {
  changeDelayTime(newValue)
})

useAudioInput()
</script>
