declare module '*.js' {
  interface WasmModule {
    _add: (a: number, b: number) => number
  }
  const initWasm: () => Promise<WasmModule>
  export default initWasm
}
