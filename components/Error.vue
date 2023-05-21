<template>
  <div class="flex flex-col justify-center items-center">
    <p class="my-4">Sorry, an error occurred</p>
    <button
      @click="emits('update:try')"
      class="bg-purple-500 hover:bg-purple-700 duration-300 hover:scale-105 px-4 py-2 rounded-md shadow-md text-white"
    >
      Try again
    </button>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  'update:try': []
}>()
</script>
