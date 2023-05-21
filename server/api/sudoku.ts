import { generate, Level } from "../../plugins/sudoku"


export default defineEventHandler((event) => {

    const { difficulty } = getQuery(event)

    if (!difficulty || !Object.values(Level).includes(difficulty as Level)) {
        setResponseStatus(event, 400)
        return { error: 'Invalid difficulty' }
    }

    return generate(difficulty as Level)
})
