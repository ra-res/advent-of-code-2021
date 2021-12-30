import * as fs from "fs";

const lines: Array<string> = fs
  .readFileSync("../input/day2.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x))
  .map((x) => String(x));

const partOne = (lines: Array<string>): number => {
  let horizontal = 0,
    depth = 0;

  const exec = (command: string, num: number) => {
    if (command === "down") {
      depth += num;
    } else if (command === "forward") {
      horizontal += num;
    } else if (command === "up") {
      depth -= num;
    }
  };

  lines.forEach((line: string) => {
    const s = line.split(" "),
      command = s[0],
      num = Number(s[1]);
    exec(command, num);
  });

  return horizontal * depth;
};

const partTwo = (lines: Array<string>) => {
  let horizontal = 0,
    depth = 0,
    aim = 0;

  const exec = (command: string, num: number) => {
    if (command === "down") {
      aim += num;
    } else if (command === "forward") {
      horizontal += num;
      depth += num * aim;
    } else if (command === "up") {
      aim -= num;
    }
  };

  lines.forEach((line: string) => {
    const s = line.split(" "),
      command = s[0],
      num = Number(s[1]);
    exec(command, num);
  });

  return horizontal * depth;
};

console.log(`part 1 answer: ${partOne(lines)}`);
console.log(`part 2 answer: ${partTwo(lines)}`);
