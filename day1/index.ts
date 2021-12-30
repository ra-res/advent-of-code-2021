import * as fs from "fs";

const testLines = fs
  .readFileSync("../input/day1test.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x))
  .map((x) => parseInt(x));

const lines = fs
  .readFileSync("../input/day1.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x))
  .map((x) => parseInt(x));

const partOne = (lines: Array<number>): number => {
  let count: number = 0;
  lines.forEach((line: number, index: number) => {
    if (index === 0) {
      return;
    }

    if (line > lines[index - 1]) {
      ++count;
    }
  });
  return count;
};

const partTwo = (lines: Array<number>): number => {
  let count: number = 0;
  const reducer = (i: number, j: number): number => i + j;
  for (let index = 0; index < lines.length; index++) {
    try {
      const curSum: number = lines.slice(index, index + 3).reduce(reducer);
      const nextSum: number = lines.slice(index + 1, index + 4).reduce(reducer);
      if (curSum < nextSum) {
        count++;
      }
    } catch (err) {
      //empty
    }
  }
  return count;
};

console.log(`Answer to part1: ${partOne(lines)}`);
console.log(`Answer to part2: ${partTwo(lines)}`);
