import * as fs from 'fs'

const testLines: Array<string> = fs
    .readFileSync('../input/day3test.txt', { encoding: 'utf-8' })
    .split('\n')
    .filter(x => Boolean(x))
    .map(x => String(x))

const lines: Array<string> = fs
    .readFileSync('../input/day3.txt', { encoding: 'utf-8' })
    .split('\n')
    .filter(x => Boolean(x))
    .map(x => String(x))

const countBits = (arr: Array<string>): Array<number> => {
    const countActiveBits: Array<number> = Array(arr[0].length).fill(0)
    arr.forEach((line: string) => {
        line.split('').forEach((bit: string, bitIndex: number) => {
            countActiveBits[bitIndex] += Number(bit)
        })
    })

    return countActiveBits
}

const partOne = (lines: Array<string>) => {
    const countActiveBits: Array<number> = countBits(lines)
    const gammaBinary: Array<number> = []

    countActiveBits.forEach((oneCount: number) => {
        const zeroCount = lines.length - oneCount
        const bit = oneCount > zeroCount ? 1 : 0
        gammaBinary.push(bit)
    })

    const epsilonBinary: Array<number> = gammaBinary.map(x => (x === 1 ? 0 : 1))

    const binaryToDecimal = (arr: Array<number>): number => {
        return arr.reduce((acc, val) => {
            return (acc << 1) | val
        })
    }

    const gamma: number = binaryToDecimal(gammaBinary)
    const epsilon: number = binaryToDecimal(epsilonBinary)

    return gamma * epsilon
}

const partTwo = (lines: Array<string>): number => {
    let oxygenRatingLines = lines,
        scrubberRatingLines = lines

    let countActiveBits: Array<number> = Array(lines[0].length).fill(0)

    let index = 0
    while (oxygenRatingLines.length > 1 && index < countActiveBits.length) {
        countActiveBits = countBits(oxygenRatingLines)

        const mostCommonBit =
            countActiveBits[index] >= oxygenRatingLines.length - countActiveBits[index] ? 1 : 0

        oxygenRatingLines = oxygenRatingLines.filter(x => Number(x[index]) === mostCommonBit)
        index++
    }

    countActiveBits = Array(scrubberRatingLines[0].length).fill(0)

    index = 0
    while (scrubberRatingLines.length > 1 && index < countActiveBits.length) {
        countActiveBits = countBits(scrubberRatingLines)

        const leastCommonBit =
            countActiveBits[index] >= scrubberRatingLines.length - countActiveBits[index] ? 0 : 1

        scrubberRatingLines = scrubberRatingLines.filter(x => Number(x[index]) === leastCommonBit)
        index++
    }

    const oxygenRating: number = parseInt(oxygenRatingLines[0], 2),
        scrubberRating: number = parseInt(scrubberRatingLines[0], 2)

    return oxygenRating * scrubberRating
}

console.log(`part 1 answer: ${partOne(lines)}`)
console.log(`part 2 answer: ${partTwo(lines)}`)
