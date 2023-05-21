<template>
  <div :class="borderStyle" :key="x + y">
    <input
      placeholder=""
      type="text"
      inputmode="numeric"
      :disabled="value.locked"
      pattern="[0-9]*"
      v-model="value.value"
      @keyup="hasChanged"
      @focus="hasFocus"
      class="w-full h-full text-black text-center text-3xl font-bold bg-transparent outline-none focus:bg-orange-200"
    />
  </div>
</template>

<script setup lang="ts">
export interface Cell {
  value: number | null
  correct: boolean
  focus: boolean
  locked: boolean
}

const props = defineProps<{
  x: number
  y: number
  initialValue: Cell
}>()

const emits = defineEmits<{
  'update:value': [xy: [x: number, y: number], value: number | null]
  'update:focus': [xy: [x: number, y: number]]
}>()

const hasChanged = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    const value = parseInt(event.target.value)
    if (isNaN(value) || value < 1 || value > 9) {
      event.target.value = ''
      emits('update:value', [props.x, props.y], null)
      return
    }
    event.target.value = String(value)
    emits('update:value', [props.x, props.y], Number(value))
  }
}

const hasFocus = () => {
  emits('update:focus', [props.x, props.y])
}

const value = ref<Cell>(props.initialValue)

const borderStyle = computed(() => {
  const styles = {
    base: 'w-full h-full border-spacing-0 border-[0.2px]  border-gray-500  relative',
    left: ' border-l-2 border-l-gray-900',
    right: ' border-r-2 border-r-gray-900',
    top: ' border-t-2 border-t-gray-900',
    bottom: ' border-b-2 border-b-gray-900',
    squareBottom: ' border-b-2 border-b-gray-900',
    squareRight: ' border-r-2 border-r-gray-900',
    bgWrong: ' bg-red-300',
    bgFocus: ' bg-orange-200',
    bgLocked: ' bg-gray-100',
    bgDefault: ' bg-white hover:bg-green-100',
  }
  let style = styles.base

  if (props.y == 0) style += styles.left
  if (props.x == 0) style += styles.top
  if (props.x == 8) style += styles.bottom
  if (props.y == 8) style += styles.right

  if ((props.y + 1) % 3 === 0) style += styles.squareRight
  if ((props.x + 1) % 3 === 0) style += styles.squareBottom

  if (!props.initialValue.correct) {
    style += styles.bgWrong
  } else if (props.initialValue.focus) {
    style += styles.bgFocus
  } else if (props.initialValue.locked) {
    style += styles.bgLocked
  } else {
    style += styles.bgDefault
  }
  return style
})
</script>
