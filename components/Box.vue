<script setup lang="ts">
import Square from '@/components/Square.vue'

const slots = defineSlots<{
  default(): typeof Square
}>()
</script>

<template>
  <div
    class="max-w-[90vw] max-h-[90vw] w-[80vh] h-[80vh] bg-white border box-border border-gray-600 grid grid-cols-9 grid-rows-[9] relative"
  >
    <slots.default />
  </div>
</template>
