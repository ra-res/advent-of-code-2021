import * as fs from "fs";

//const testLines: Array<string> = fs
//  .readFileSync("../input/day3test.txt", { encoding: "utf-8" })
//  .split("\n")
//  .filter((x) => Boolean(x))
//  .map((x) => String(x));

const lines: Array<string> = fs
  .readFileSync("../input/day3.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x))
  .map((x) => String(x));

const partOne = (lines: Array<string>) => {
  const countBitOne: Array<number> = [].fill(0, 0, lines[0].length);

  lines.forEach((line: string) => {
    line.split("").forEach((bit: string, bitIndex: number) => {
      if (bit === "1") {
        countBitOne[bitIndex] = countBitOne[bitIndex]
          ? countBitOne[bitIndex] + 1
          : 1;
      }
    });
  });

  const gammaBitArray: Array<number> = [];

  countBitOne.forEach((oneCount: number) => {
    const zeroCount = lines.length - oneCount;
    if (oneCount > zeroCount) {
      gammaBitArray.push(1);
    } else {
      gammaBitArray.push(0);
    }
  });

  const bitToDecimal = (arr: Array<number>): number => {
    return arr.reduce((acc, val) => {
      return (acc << 1) | val;
    });
  };

  const gamma: number = bitToDecimal(gammaBitArray);
  const epsilon: number = bitToDecimal(
    gammaBitArray.map((x) => (x === 1 ? 0 : 1))
  );

  return gamma * epsilon;
};

console.log(`part 1 answer: ${partOne(lines)}`);
// console.log(`part 2 answer: ${partTwo(lines)}`);
