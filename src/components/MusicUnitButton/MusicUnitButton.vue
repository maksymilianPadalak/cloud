<template>
  <span :class="[$style.musicUnitIcon, `material-symbols-outlined`]" @click="onClick">
    {{ materialSymbolsName }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  //Name of the material symbols icon
  //Icons: https://fonts.google.com/icons?icon.size=24&icon.color=%231f1f1f
  materialSymbolsName: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const onClick = () => emit('click')
</script>

<style module>
.musicUnitIcon {
  font-size: 50px;
  color: black;
  cursor: pointer;
  font-weight: 600;
  border-radius: 50%;
  border: 5px solid black;
  padding: 5px;
  background-color: lightgray;
  user-select: none;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
