<template>
  <div :class="$style.root">
    <h1>WebAssembly Result: {{ result }}</h1>
    <div>
      <input type="number" step="1" v-model="a" :class="$style.input" />
      <span @click="a++" :class="$style.operator">+</span>
      <span @click="a--" :class="$style.operator">-</span>
    </div>
    <div>
      <input type="number" step="1" v-model="b" :class="$style.input" />
      <span @click="b++" :class="$style.operator">+</span>
      <span @click="b--" :class="$style.operator">-</span>
    </div>
    <button @click="runWasm" :class="$style.button">Run WASM</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import initWasm from '../../../wasm/example.js'

const result = ref(0)
const a = ref(0)
const b = ref(0)

const runWasm = async () => {
  const wasmModule = await initWasm()
  result.value = wasmModule._add(a.value, b.value)
}
</script>

<style module>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.input {
  width: 100px;
  height: 30px;
  margin: 10px;
  border: 1px solid lightblue;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  background-color: #f0f0f0;
}

.operator {
  font-size: 24px;
  font-weight: bold;
  color: lightblue;
  cursor: pointer;
  user-select: none;
}

.button {
  width: 100px;
  height: 30px;
  margin: 10px;
  border: 1px solid lightblue;
  border-radius: 5px;
  padding: 5px;
  background-color: lightblue;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}
</style>
