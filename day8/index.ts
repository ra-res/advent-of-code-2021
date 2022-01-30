import * as fs from 'fs'

const lines: Array<string> = fs
    .readFileSync('../input/day8.txt', { encoding: 'utf-8' })
    .toString()
    .split('\n')
    .filter(Boolean)

const partOne = (lines: Array<string>): number => {
    const arr = lines.map(line => line.split(' | ')[1]).map(line => line.split(' '))

    let count = 0

    arr.forEach(row => {
        row.forEach(elem => {
            switch (elem.length) {
                case 2:
                case 4:
                case 3:
                case 7:
                    count++
            }
        })
    })

    return count
}

const partTwo = (lines: Array<string>): number => {
    const data = lines.map(line => line.split(' | ').map(elem => elem.split(' ')))

    let result = 0

    // indices of segments included in a digit
    const digitSegments = [
        '0,1,2,4,5,6', // 0
        '2,5', // 1
        '0,2,3,4,6', // 2
        '0,2,3,5,6', // 3
        '1,2,3,5', // 4
        '0,1,3,5,6', // 5
        '0,1,3,4,5,6', // 6
        '0,2,5', // 7
        '0,1,2,3,4,5,6', // 8
        '0,1,2,3,5,6' // 9
    ]

    const knownBySegmentsCount = { 2: 1, 4: 4, 3: 7, 7: 8 }
    const knownSegmentsByAppearance = { 6: 1, 4: 4, 9: 5 }

    for (const [patterns, values] of data) {
        const knownPatterns = []
        const segmentAppearance = {}

        for (const pattern of patterns) {
            // get known patterns by segments count
            if (pattern.length in knownBySegmentsCount) {
                const digit = knownBySegmentsCount[pattern.length]

                knownPatterns[digit] = pattern.split('')
            }

            // count segment appearances
            for (const symbol of pattern) {
                segmentAppearance[symbol] = segmentAppearance[symbol] + 1 || 1
            }
        }

        const segments = []

        // get known segments by appearance count
        for (const [symbol, count] of Object.entries(segmentAppearance)) {
            if (count in knownSegmentsByAppearance) {
                const segmentIndex = knownSegmentsByAppearance[count]

                segments[segmentIndex] = symbol
            }
        }

        segments[0] = knownPatterns[7].filter(s => !knownPatterns[1].includes(s))[0]
        segments[2] = knownPatterns[1].filter(s => !segments.includes(s))[0]
        segments[3] = knownPatterns[4].filter(s => !segments.includes(s))[0]
        segments[6] = knownPatterns[8].filter(s => !segments.includes(s))[0]

        let numericValue = ''

        for (const value of values) {
            const valueSegments = value
                .split('')
                .map(s => segments.indexOf(s))
                .sort()
                .join()
            const digit = digitSegments.indexOf(valueSegments)

            numericValue += digit
        }

        result += parseInt(numericValue, 10)
    }

    return result
}

console.log(partOne(lines))
console.log(partTwo(lines))
