<template>
  <main>
    <h1>HOME</h1>
    <div class="keyboard">
      <div class="key-col">
        <button class="key" @keydown="playNote('C4')"></button><span class="key-label">C4</span>
      </div>
      <div class="key-col">
        <button class="key" @keydown="playNote('D4')"></button><span class="key-label">D4</span>
      </div>
      <div class="key-col">
        <button class="key" @keydown="playNote('Eb4')"></button><span class="key-label">Eb4</span>
      </div>
      <div class="key-col">
        <button class="key" @keydown="playNote('F4')"></button><span class="key-label">F4</span>
      </div>
      <div class="key-col">
        <button class="key" @keydown="playNote('G4')"></button><span class="key-label">G4</span>
      </div>
      <div class="key-col">
        <button class="key" @keydown="playNote('Ab4')"></button><span class="key-label">Ab4</span>
      </div>
      <div class="key-col">
        <button class="key" @keydown="playNote('Bb4')"></button><span class="key-label">Bb4</span>
      </div>
      <div class="key-col">
        <button class="key" @keydown="playNote('C5')"></button><span class="key-label">C5</span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import * as Tone from 'tone'
import { onMounted, onBeforeUnmount } from 'vue'

const synth = new Tone.PolySynth(Tone.Synth).toDestination()

const noteMap: Record<string, string> = {
  a: 'C4',
  s: 'D4',
  d: 'Eb4',
  f: 'F4',
  g: 'G4',
  h: 'Ab4',
  j: 'Bb4',
  k: 'C5',
}

const playNote = (note: string) => {
  synth.triggerAttackRelease(note, '2n')
}

const handleKeyDown = (e: KeyboardEvent) => {
  const key = e.key.toLowerCase()
  if (noteMap[key]) {
    playNote(noteMap[key])
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background: #f4f6fb;
}

.keyboard {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 2rem 2rem 2rem 2rem;
  margin-top: 1.2rem;
  gap: 1rem;
}

.key-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.key-label {
  margin-top: 0.5rem;
  font-size: 1.1rem;
  color: #888;
  font-family: 'Inter', 'Montserrat', Arial, sans-serif;
  font-weight: 500;
  letter-spacing: 0.03em;
  user-select: none;
}

.key {
  min-width: 48px;
  width: 60px;
  height: 220px;
  border-radius: 1.2rem 1.2rem 2.2rem 2.2rem;
  border: 1.5px solid #e3e7ef;
  margin: 0;
  font-size: 1.1rem;
  font-family: 'Inter', 'Montserrat', Arial, sans-serif;
  font-weight: 600;
  color: #222;
  background: #f7fafd;
  box-shadow: none;
  transition:
    transform 0.09s,
    filter 0.13s,
    border 0.13s;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1.1rem;
  position: relative;
  letter-spacing: 0.04em;
}

.key:nth-child(1) {
  background: linear-gradient(180deg, #e0ecff 0%, #f7fafd 100%);
}
.key:nth-child(2) {
  background: linear-gradient(180deg, #e6f7f1 0%, #f7fafd 100%);
}
.key:nth-child(3) {
  background: linear-gradient(180deg, #fbe7ef 0%, #f7fafd 100%);
}
.key:nth-child(4) {
  background: linear-gradient(180deg, #fffbe7 0%, #f7fafd 100%);
}
.key:nth-child(5) {
  background: linear-gradient(180deg, #ede7fb 0%, #f7fafd 100%);
}
.key:nth-child(6) {
  background: linear-gradient(180deg, #e7fbf7 0%, #f7fafd 100%);
}
.key:nth-child(7) {
  background: linear-gradient(180deg, #e7f0fb 0%, #f7fafd 100%);
}
.key:nth-child(8) {
  background: linear-gradient(180deg, #fbe7fa 0%, #f7fafd 100%);
}

.key:hover,
.key:focus {
  filter: brightness(1.08);
  border: 1.5px solid #b6c3e6;
  transform: translateY(-7px) scale(1.03);
}

.key:active {
  filter: brightness(0.97);
  border: 1.5px solid #a3b1c9;
  transform: scale(0.98);
}

h1 {
  color: #222;
  font-family: 'Inter', 'Montserrat', Arial, sans-serif;
  font-size: 2rem;
  margin-bottom: 1.2rem;
  letter-spacing: 0.05em;
  font-weight: 700;
}
</style>
