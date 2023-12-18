import { readData } from '../../shared.ts';
import chalk from 'chalk';

type game = {
  id: number,
  blue: number,
  red: number,
  green: number,
  valid: boolean,
}

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  const bag = {
    red: 12,
    green: 13,
    blue: 14,
  }

  console.time();

  const games: Array<game> = [];
  data.forEach(line => {
    const dataLine = line.split(':');
    const gameID = parseInt(dataLine[0].match(/(Game )(\d+)/)[2]);
    const sets = dataLine[1].split(';');
    const ga = <game>{
      id: gameID,
      red: 0,
      green: 0,
      blue: 0,
      valid: true,
    };

    sets.forEach(set => {
      const colors = set.split(',').map(color => color.trim());
      colors.forEach(color => {
        const colorCount = color.match(/(\d+) (red|green|blue)/);
        switch (colorCount[2]) {
          case 'red':
            ga.red = parseInt(colorCount[1]);
            if (ga.red > bag.red) ga.valid = false;
            break;
          case 'green':
            ga.green = parseInt(colorCount[1]);
            if (ga.green > bag.green) ga.valid = false;
            break;
          case 'blue':
            ga.blue = parseInt(colorCount[1]);
            if (ga.blue > bag.blue) ga.valid = false;
        }
      });
    });

    if (ga.valid) {
      games.push(ga);
    }

  });

  const result = games.reduce((a, b) => a + b.id, 0);

  console.timeEnd();
  return result;
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
