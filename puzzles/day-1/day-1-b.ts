import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1b(dataPath?: string) {
  const data: Array<any> = await readData(dataPath);
  const numbers = {
    'one': 1, '1': 1,
    'two': 2, '2': 2,
    'three': 3, '3': 3, 
    'four': 4, '4': 4, 
    'five': 5, '5': 5,
    'six': 6, '6': 6,
    'seven': 7, '7': 7,
    'eight': 8, '8': 8,
    'nine': 9, '9': 9,
  };
  const digits: Array<number> = [];
  const numberKeys: Array<string> = Object.keys(numbers);
  const pattern: string = numberKeys.join('|');
  const re = new RegExp(`\(${pattern}\)`);
  
  data.forEach(line => {
    let parts: Array<string> = [];

    for (let i = 0; i < line.length; i++) {
      parts.push(line.substring(i, i+5));
    }

    let chunks: Array<string> = parts.join('').split(re).filter(chunk => chunk !== '');
    chunks = chunks.filter(chunk => numberKeys.includes(chunk));

    const firstNumber: string = chunks.find(chunk => numberKeys.includes(chunk));
    const lastNumber: string = chunks.findLast(chunk => numberKeys.includes(chunk));

    digits.push(parseInt(`${numbers[firstNumber]}${numbers[lastNumber]}`));

  });

  const sum: number = digits.reduce((a: number, b: number) => a + b, 0);

  return sum;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
