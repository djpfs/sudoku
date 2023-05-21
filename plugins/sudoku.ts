import { getSudoku } from 'sudoku-gen';

export enum Level {
    easy = 'easy',
    medium = 'medium',
    hard = 'hard',
    expert = 'expert',
}

export interface SudokuResponse {
    puzzle: string
    solution: string
    difficulty: string
}

export interface SudokuErrorResponse {
    error: string
}

export function generate(difficulty: Level): SudokuResponse {
    return getSudoku(difficulty)
}

export default {
    generate,
    Level
}
