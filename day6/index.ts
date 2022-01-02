import * as fs from 'fs'

const lines: Array<number> = fs
    .readFileSync('../input/day6.txt', { encoding: 'utf-8' })
    .toString()
    .split(',')
    .map(Number)
    .filter(x => Boolean(x))

//const partOne = (lines: Array<number>): number => {
//    let daysLeft = 80
//    let newFish: Array<number> = []
//    while (daysLeft > 0) {
//        lines.forEach((fish: number, i: number) => {
//            if (fish === 0) {
//                lines[i] = 6
//                newFish.push(8)
//            } else {
//                lines[i]--
//            }
//        })
//
//        lines = lines.concat(newFish)
//        newFish = []
//        daysLeft--
//    }
//    return lines.length
//}

const main = (lines: Array<number>, days: number): number => {
    const fishState = Array(9).fill(0)
    lines.forEach(i => fishState[i]++)

    Array(days)
        .fill(0)
        .forEach(_ => {
            const newFish = fishState.shift()
            fishState[6] += newFish
            fishState.push(newFish)
        })
    return fishState.reduce((fish, totalFish) => fish + totalFish)
}
console.log(`answer part 1:  ${main(lines, 80)}`)
console.log(`answer part 1:  ${main(lines, 256)}`)
