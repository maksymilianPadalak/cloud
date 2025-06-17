<template>
  <div
    ref="knobRef"
    :class="$style.knobContainer"
    @mousedown="onPointerDown"
    @touchstart="onPointerDown"
    :style="dragging ? { userSelect: 'none' } : undefined"
  >
    <div :class="$style.knob" :style="{ '--angle': `${angle}deg` }">
      <div :class="$style.teeth" />
      <div :class="$style.cap" />
      <div :class="[$style.indicator, { [$style.dragging]: dragging }]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, defineModel, defineOptions, defineProps } from 'vue'

const { min, max } = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 11 },
})

const effectParameter = defineModel('effectParameter', { default: 5.5, required: true })

const knobRef = ref<HTMLElement | null>(null)
const dragging = ref(false)
const angle = ref(40)

const minAngle = 40
const maxAngle = 320
const angleRange = maxAngle - minAngle

const paramToAngle = (param: number) => minAngle + ((param - min) / (max - min)) * angleRange
const angleToParam = (ang: number) => ((ang - minAngle) / angleRange) * (max - min) + min

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
  deg = deg + 90
  if (deg < 0) deg += 360
  deg = deg - 180
  if (deg < 0) deg += 360
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
  onPointerMove(e, true)
}

onBeforeUnmount(() => {
  onPointerUp()
})

defineOptions({ name: 'EffectKnob' })
</script>

<style module>
.knobContainer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  transform: rotate(180deg);
}

.knob {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #222;
  position: relative;
  box-shadow: 0 2px 8px lightblue;
  transform: rotate(var(--angle, 40deg));
  transition: box-shadow 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.1s ease;

  &:hover {
    transform: rotate(var(--angle, 40deg)) scale(1.05);
  }
}

.cap {
  width: 52px;
  height: 52px;
  background: white;
  border-radius: 50%;
  position: absolute;
  left: 4px;
  top: 4px;
  box-shadow: 0 1px 4px #0006 inset;
}

.indicator {
  position: absolute;
  left: 50%;
  top: 10px;
  width: 6px;
  height: 6px;
  background: black;
  border-radius: 50%;
  transform: translateX(-50%);
}

.indicator.dragging {
  background: red;
}
</style>
