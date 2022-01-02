import * as fs from 'fs'

const lines: Array<number> = fs
    .readFileSync('../input/day7.txt', { encoding: 'utf-8' })
    .toString()
    .split(',')
    .map(Number)

const main = (lines: Array<number>): [number, number] => {
    const calculateMedian = (lines: Array<number>): number => {
        if (lines.length === 0) return 0

        lines.sort((a, b) => a - b)
        const middle = Math.floor(lines.length / 2)

        if (lines.length % 2) return lines[middle]

        return (lines[middle - 1] + lines[middle]) / 2.0
    }

    const median = calculateMedian(lines)

    let fuel: number = 0

    lines.forEach((val: number) => {
        fuel += Math.abs(val - median)
    })

    let fuelConsumed: Array<number> = []

    const min: number = Math.min(...lines),
        max: number = Math.max(...lines)

    for (let pos = min; pos < max; pos++) {
        fuelConsumed[pos] = 0
        for (let j = 0; j < lines.length; j++) {
            const posDiff = Math.abs(lines[j] - pos)
            fuelConsumed[pos] += posDiff * ((posDiff + 1) / 2)
        }
    }

    return [fuel, Math.min(...fuelConsumed)]
}
console.log(`answer part 1 & 2:  ${main(lines)}`)
