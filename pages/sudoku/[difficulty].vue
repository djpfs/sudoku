<script setup lang="ts">
import Box from '@/components/Box.vue'
import Square, { Cell } from '@/components/Square.vue'
import Loading from '@/components/Loading.vue'
import Error from '@/components/Error.vue'
import { SudokuResponse, SudokuErrorResponse } from '@/plugins/sudoku'

const route = useRoute()

const difficulty = ref<string>(route.params.difficulty as string)
const board = ref<Cell[][]>([])

const { data, pending, error, refresh } = await useFetch<
  SudokuResponse,
  SudokuErrorResponse
>(`/api/sudoku`, {
  query: {
    difficulty: difficulty.value,
  },
})

const puzzleToArray = (puzzle: string) =>
  puzzle.split('').map((v) => (v === '-' ? null : Number(v)))

const checkCorrect = (index: number[], value: number) => {
  clearFocus()
  clearIncorrect()
  board.value[index[0]][index[1]].value = value
  checkConflicts(index, value)
  checkWin()
}

const checkConflicts = (index: number[], value: number) => {
  const x = index[0]
  const y = index[1]

  const conflicts = []

  for (let i = 0; i < 9; i++) {
    if (board.value[i][y].value === value && i !== x) {
      conflicts.push([i, y])
    }
  }

  for (let i = 0; i < 9; i++) {
    if (board.value[x][i].value === value && i !== y) {
      conflicts.push([x, i])
    }
  }

  const x0 = Math.floor(x / 3) * 3
  const y0 = Math.floor(y / 3) * 3

  for (let i = x0; i < x0 + 3; i++) {
    for (let j = y0; j < y0 + 3; j++) {
      if (board.value[i][j].value === value && i !== x && j !== y) {
        conflicts.push([i, j])
      }
    }
  }

  conflicts.forEach((v) => {
    board.value[v[0]][v[1]].focus = true
    board.value[v[0]][v[1]].correct = false
  })
}

const clearFocus = () => {
  for (let i = 0; i < 9; i++) {
    board.value[i].forEach((v) => (v.focus = false))
  }
}

const clearIncorrect = () => {
  for (let i = 0; i < 9; i++) {
    board.value[i].forEach((v) => (v.correct = true))
  }
}

const setFocus = (index: number[]) => {
  clearFocus()
  clearIncorrect()
  board.value[index[0]].forEach((v) => (v.focus = true))
  for (let i = 0; i < 9; i++) {
    board.value[i][index[1]].focus = true
  }
}

const getY = (index: number) => {
  if (index % 9 === 1) return 0
  if (index % 9 === 0) return 8
  return (index % 9) - 1
}

const getX = (index: number) => {
  if (index % 9 === 0) return Math.floor(index / 9) - 1
  return Math.floor(index / 9)
}

const checkWin = () => {
  for (let i = 0; i < 9; i++) {
    const row = board.value[i].map((v) => v.value)
    if (row.includes(null)) return false
    if (new Set(row).size !== 9) return false
  }

  for (let i = 0; i < 9; i++) {
    const col = board.value.map((v) => v[i].value)
    if (col.includes(null)) return false
    if (new Set(col).size !== 9) return false
  }

  for (let i = 0; i < 9; i++) {
    const x0 = Math.floor(i / 3) * 3
    const y0 = (i % 3) * 3
    const box = []
    for (let j = x0; j < x0 + 3; j++) {
      for (let k = y0; k < y0 + 3; k++) {
        box.push(board.value[j][k].value)
      }
    }
    if (box.includes(null)) return false
    if (new Set(box).size !== 9) return false
  }

  return true
}

onMounted(() => {
  board.value = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => ({
      value: 0,
      correct: false,
      focus: false,
      locked: false,
    }))
  )
  if (data.value) {
    const puzzleArray = puzzleToArray(data.value.puzzle)
    console.log(puzzleArray)
    for (let i = 1; i <= 81; i++) {
      if (puzzleArray[i - 1] === null) {
        board.value[getX(i)][getY(i)] = {
          value: null,
          correct: true,
          focus: false,
          locked: false,
        }
        continue
      }
      board.value[getX(i)][getY(i)] = {
        value: puzzleArray[i - 1],
        correct: true,
        focus: false,
        locked: true,
      }
    }
  }
})
</script>

<template>
  <div class="w-full h-screen grid place-content-center bg-white">
    <Loading v-if="pending" />
    <Error @update:try="refresh()" v-if="error" />
    <Box v-if="data && board.length > 0">
      <Square
        v-for="idx in 81"
        :x="getX(idx)"
        :y="getY(idx)"
        :initial-value="board[getX(idx)][getY(idx)]"
        @update:value="(index, value) => checkCorrect(index, value)"
        @update:focus="setFocus"
      />
    </Box>
    <Btn
      class="mt-4"
      text="New Game"
      @onClick="() => navigateTo({ path: '/' })"
    />
  </div>
</template>
