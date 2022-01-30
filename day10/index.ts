import * as fs from 'fs'

const lines: string[] = fs
    .readFileSync('../input/day10.txt', { encoding: 'utf-8' })
    .toString()
    .split('\n')

const partOne = (lines: string[]): number => {
    const stack = []

    const openingTokens = ['(', '{', '[', '<']

    const tokenToPoints = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    }

    const closingToOpeningToken = {
         ')': '(',
         ']': '[',
         '}': '{',
         '>': '<'
    }

    let res = 0

    for (const line of lines) {
        for (const token of line.split('')) {
            if (openingTokens.includes(token)) {
                stack.push(token)
            } else {
                const lastToken = stack[stack.length - 1]
                const actualToken = closingToOpeningToken[token]

                if (actualToken !== lastToken) {
                    res += tokenToPoints[token]
                    break
                } else {
                    stack.pop()
                }
            }
        }
    }

    return res 
}

// const partTwo = (lines: number[][]): number => {}

console.log(partOne(lines))
// console.log(partTwo(lines))
