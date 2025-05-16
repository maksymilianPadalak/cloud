<template>
  <EffectPedal
    :effectParameter="delayTime"
    @updateEffectParameter="
      (time) => {
        delayTime = time
      }
    "
  />
</template>

<script setup lang="ts">
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import { useAudioInput } from '@/composables/useAudioInput'

const { delayTime } = useAudioInput()
</script>
