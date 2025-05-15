<template>
  <div class="tuner-card">
    <div class="tuner-title">Tuner</div>
    <div v-if="frequency !== null" class="frequency-display">
      {{ frequency }} <span class="hz">Hz</span>
    </div>
    <div v-else class="listening">Listening...</div>
  </div>
</template>

<script setup lang="ts">
import { useMicFrequency } from '@/composables/useMicFrequency'

const frequency = useMicFrequency()
</script>

<style scoped>
.tuner-card {
  max-width: 350px;
  margin: 60px auto;
  padding: 2.5rem 2rem 2rem 2rem;
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}
.tuner-title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.frequency-display {
  font-size: 3.5rem;
  font-weight: 800;
  color: #00eaff;
  text-shadow:
    0 4px 24px #00eaff44,
    0 1.5px 0 #222;
  animation: pulse 1.2s infinite alternate;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
}
.hz {
  font-size: 1.5rem;
  font-weight: 400;
  color: #b2fefa;
  margin-left: 0.2em;
}
.listening {
  font-size: 1.3rem;
  color: #b2fefa;
  opacity: 0.8;
  letter-spacing: 0.05em;
  margin-top: 1.5rem;
}
@keyframes pulse {
  0% {
    color: #00eaff;
    text-shadow:
      0 4px 24px #00eaff44,
      0 1.5px 0 #222;
  }
  100% {
    color: #b2fefa;
    text-shadow:
      0 8px 32px #b2fefa44,
      0 2px 0 #222;
  }
}
</style>
