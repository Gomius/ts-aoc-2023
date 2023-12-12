import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data: Array<any> = await readData(dataPath);
  const digits: Array<number> = [];
  
  data.forEach(line => {
    const allChar = line.split('');
    const firstDigit: string = allChar.find(digit => !isNaN(digit));
    const lastDigit: string = allChar.findLast(digit => !isNaN(digit));
    digits.push(parseInt(`${firstDigit}${lastDigit}`));
  });

  const sum: number = digits.reduce((a: number, b: number) => a + b, 0);

  return sum;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
