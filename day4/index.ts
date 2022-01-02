import * as fs from 'fs'

const lines: Array<string> = fs
    .readFileSync('../input/day4.txt', { encoding: 'utf-8' })
    .toString()
    .split('\n')

const main = (lines: Array<string>): [number, number] => {
    const drawnNumbers = lines
        .shift()
        .split(',')
        .map(x => parseInt(x, 10))
    const boards = []

    let board: number[][]
    lines.forEach((line: string) => {
        if (!line) {
            board = []
            boards.push(board)
        } else {
            board.push(
                line
                    .trim()
                    .split(/\s+/)
                    .map(x => parseInt(x, 10))
            )
        }
    })

    const checkBoard = (
        board: Array<Array<number>>,
        drawnNumbers: Array<number>
    ): [boolean, number] => {
        const size = board[0].length,
            hits: Array<number> = new Array(size * 2).fill(0)
        let hasWon: boolean = false,
            notDrawnSum: number = 0

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (drawnNumbers.includes(board[i][j])) {
                    if (++hits[i] === size || ++hits[j + size] === size) {
                        hasWon = true
                    }
                } else {
                    notDrawnSum += board[i][j]
                }
            }
        }

        return [hasWon, notDrawnSum]
    }

    let returnPartOne = -1,
        returnPartTwo = -1
    drawnNumbers.forEach((_, i: number) => {
        boards.forEach((board: Array<Array<number>>, j: number) => {
            if (board && board.length) {
                const [hasWon, notDrawnSum] = checkBoard(board, drawnNumbers.slice(0, i))
                if (hasWon && returnPartOne === -1) {
                    returnPartOne = notDrawnSum * drawnNumbers[i - 1]
                }
                if (hasWon) {
                    returnPartTwo = notDrawnSum * drawnNumbers[i - 1]
                    boards[j] = null
                }
            }
        })
    })

    return [returnPartOne, returnPartTwo]
}

console.log(`part 1 & 2 answer: ${main(lines)}`)
