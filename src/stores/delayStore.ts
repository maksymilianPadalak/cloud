import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDelayStore = defineStore('delayStore', () => {
  const delayTime = ref(1)

  const changeDelayTime = (newTime: number) => {
    delayTime.value = newTime
  }

  return { delayTime, changeDelayTime }
})
