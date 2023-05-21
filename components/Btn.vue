<template>
  <button
    @click="emits('onClick')"
    class="bg-purple-500 hover:bg-purple-700 duration-300 hover:scale-105 px-4 py-2 rounded-md shadow-md text-white"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  onClick: []
}>()

defineProps<{
  text: string
}>()
</script>
