import * as fs from 'fs'

const lines: number[][] = fs
    .readFileSync('../input/day9.txt', { encoding: 'utf-8' })
    .toString()
    .split('\n')
    .map(line => line.split('').map(x => parseInt(x)))

const getAdjacents = (arr: number[][], row: number, col: number): number[][] => {
    const res: number[][] = []

    if (row + 1 < arr.length) {
        res.push([row + 1, col])
    }
    if (row - 1 > -1) {
        res.push([row - 1, col])
    }
    if (col - 1 > -1) {
        res.push([row, col - 1])
    }
    if (col + 1 < arr[row].length) {
        res.push([row, col + 1])
    }

    return res
}

const lowPoints = []

const partOne = (lines: number[][]): number => {
    let sum = 0

    for (let row = 0; row < lines.length; row++) {
        for (let col = 0; col < lines[row].length; col++) {
            let state = 0

            getAdjacents(lines, row, col).forEach(([aRow, aCol], _i) => {
                if (lines[aRow][aCol] > lines[row][col]) {
                    state++
                }
            })

            switch (state) {
                case 2:
                    if (row === 0 || row === lines.length - 1) {
                        if (col === 0 || col === lines[row].length - 1) {
                            sum += lines[row][col] + 1
                            lowPoints.push([row, col])
                        }
                    }
                    break
                case 3:
                    if (row === 0 || row === lines.length - 1) {
                        if (col > 0 && col < lines[row].length - 1) {
                            sum += lines[row][col] + 1
                        }
                    } else if (col === 0 || col === lines.length - 1) {
                        if (row > 0 && row < lines.length - 1) {
                            sum += lines[row][col] + 1
                        }
                    }
                    lowPoints.push([row, col])
                    break
                case 4:
                    sum += lines[row][col] + 1
                    lowPoints.push([row, col])
                default:
                    break
            }
        }
    }
    return sum
}

const partTwo = (lines: number[][]): number => {
    const MAX_HEIGHT = 9

    const getBasin = (arr: number[][], row: number, col: number, low = null, visited: string[] = []) => {
        const height = arr[row][col]

        if (!low) {
            low = height
        }

        visited.push([row, col].join())

        for (const [aRow, aCol] of getAdjacents(arr, row, col)) {
            if (visited.includes([aRow, aCol].join())) {
                continue
            }

            const adjacentHeight = arr[aRow][aCol]

            if (adjacentHeight >= MAX_HEIGHT) {
                continue
            }

            if (adjacentHeight < low) {
                return false
            }

            if (!getBasin(arr, aRow, aCol, low, visited)) {
                return false
            }
        }

        return visited
    }

    const basinsSize: number[] = []

    lowPoints.forEach(([row, col], _i) => {
        const basin = getBasin(lines, row, col)

        if (basin) {
            basinsSize.push(basin.length)
        }
    })

    return basinsSize
        .sort((x, y) => y - x)
        .slice(0, 3)
        .reduce((cur, total) => (total *= cur))
}

console.log(partOne(lines))
console.log(partTwo(lines))
