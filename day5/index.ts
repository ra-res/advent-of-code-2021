import * as fs from 'fs'

const lines: Array<string> = fs
    .readFileSync('../input/day5.txt', { encoding: 'utf-8' })
    .toString()
    .split('\n')
    .filter(x => Boolean(x))

const main = (lines: Array<string>): number => {
    const coordinates = lines.map(x => x.split(/[^\d]+/).map(Number))

    const plot: Array<Array<number>> = []

    const setPoint = (x: number, y: number) => {
        plot[y] = plot[y] || []
        plot[y][x] = plot[y][x] || 0
        return ++plot[y][x]
    }

    let overlapping = 0
    coordinates.forEach(([x1, y1, x2, y2]: Array<number>) => {
        let [x, y] = [x1, y1]

        // for part1 uncomment if statement
        // if (x1 === x2 || y1 == y2)
        while (true) {
            if (setPoint(x, y) === 2) {
                overlapping++
            }

            if (x === x2 && y === y2) break

            if (x > x2) {
                x--
            } else if (x < x2) {
                x++
            }

            if (y > y2) {
                y--
            } else if (y < y2) {
                y++
            }
        }
    })
    return overlapping
}

console.log(`answer:  ${main(lines)}`)
