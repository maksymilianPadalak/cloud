<template>
  <div
    ref="knobRef"
    class="radial-slider"
    @mousedown="onPointerDown"
    @touchstart="onPointerDown"
    :style="dragging ? { userSelect: 'none' } : undefined"
  >
    <div class="knob" :style="{ '--angle': `${angle}deg` }">
      <div class="teeth" />
      <div class="cap" />
      <div class="indicator" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, defineModel, defineOptions } from 'vue'

const effectParameter = defineModel('effectParameter', { default: 1, required: true })

const knobRef = ref<HTMLElement | null>(null)
const dragging = ref(false)
const angle = ref(40) // initial angle

const minAngle = 40
const maxAngle = 320
const angleRange = maxAngle - minAngle

// Map effectParameter (0-1) to angle (minAngle-maxAngle)
const paramToAngle = (param: number) => minAngle + param * angleRange
const angleToParam = (ang: number) => (ang - minAngle) / angleRange

// Keep angle in sync with v-model
watch(
  () => effectParameter.value,
  (val) => {
    angle.value = paramToAngle(val)
  },
  { immediate: true },
)

watch(angle, (val) => {
  effectParameter.value = Number(angleToParam(val).toFixed(2))
})

function getElementCenter(el: HTMLElement): [number, number] {
  const { left, top, width, height } = el.getBoundingClientRect()
  return [left + width / 2, top + height / 2] as [number, number]
}

function getAngleFromPointer(x: number, y: number, center: [number, number]) {
  const [cx, cy] = center
  const dx = x - cx
  const dy = y - cy
  const radians = Math.atan2(dy, dx)
  let deg = radians * (180 / Math.PI)
  deg = deg + 90 // rotate so 0 is at top
  if (deg < 0) deg += 360
  // Adjust for 180deg container rotation
  deg = deg - 180
  if (deg < 0) deg += 360
  // Clamp to allowed range
  const clamped = Math.max(minAngle, Math.min(maxAngle, deg))
  return clamped
}

function onPointerMove(e: MouseEvent | TouchEvent, force = false) {
  if (!dragging.value || !knobRef.value) return
  let clientX, clientY
  if (e instanceof MouseEvent) {
    clientX = e.clientX
    clientY = e.clientY
  } else {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  }
  const center = getElementCenter(knobRef.value)
  const newAngle = getAngleFromPointer(clientX, clientY, center)
  // Always update if force is true (for click), otherwise use threshold
  if (force || Math.abs(newAngle - angle.value) < 60) {
    angle.value = newAngle
  }
}

function onPointerUp() {
  dragging.value = false
  window.removeEventListener('mousemove', onPointerMove)
  window.removeEventListener('touchmove', onPointerMove)
  window.removeEventListener('mouseup', onPointerUp)
  window.removeEventListener('touchend', onPointerUp)
}

function onPointerDown(e: MouseEvent | TouchEvent) {
  dragging.value = true
  window.addEventListener('mousemove', onPointerMove)
  window.addEventListener('touchmove', onPointerMove)
  window.addEventListener('mouseup', onPointerUp)
  window.addEventListener('touchend', onPointerUp)
  onPointerMove(e, true) // force update on click
}

onBeforeUnmount(() => {
  onPointerUp()
})

defineOptions({ name: 'EffectKnob' })
</script>

<style scoped>
.radial-slider {
  position: relative;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  transform: rotate(180deg);
}
.knob {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #222;
  position: relative;
  box-shadow: 0 2px 8px lightblue;
  transform: rotate(var(--angle, 40deg));
  transition: box-shadow 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.knob .cap {
  width: 70px;
  height: 70px;
  background: white;
  border-radius: 50%;
  position: absolute;
  left: 5px;
  top: 5px;
  box-shadow: 0 1px 4px #0006 inset;
}
.knob .indicator {
  position: absolute;
  left: 50%;
  top: 12px;
  width: 8px;
  height: 8px;
  background: black;
  border-radius: 50%;
  transform: translateX(-50%);
}
</style>
