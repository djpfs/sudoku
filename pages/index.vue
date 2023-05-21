<template>
  <div class="w-full h-screen bg-gray-700 grid place-content-center">
    <h1 class="text-6xl text-white text-center mb-20 uppercase font-bold">
      Sudoku
    </h1>
    <p class="text-center text-white text-xl mb-4 italic">
      Choise a difficulty
    </p>
    <div class="w-full flex flex-col md:flex-row flex-wrap gap-x-10 gap-y-4">
      <Btn text="Easy" @onClick="setDifficulty('easy')" />
      <Btn text="Medium" @onClick="setDifficulty('medium')" />
      <Btn text="Hard" @onClick="setDifficulty('hard')" />
      <Btn text="Expert" @onClick="setDifficulty('expert')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Btn from '@/components/Btn.vue'

const setDifficulty = (difficulty: string) => {
  navigateTo({
    path: `/sudoku/${difficulty}`,
  })
}
</script>
