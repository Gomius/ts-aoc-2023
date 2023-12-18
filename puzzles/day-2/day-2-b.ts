import { readData } from '../../shared.ts';
import chalk from 'chalk';

type game = {
  id: number,
  blue: number,
  red: number,
  green: number,
  power: number,
}

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);

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
    };

    sets.forEach(set => {
      const colors = set.split(',').map(color => color.trim());
      colors.forEach(color => {
        const colorCount = color.match(/(\d+) (red|green|blue)/);
        switch (colorCount[2]) {
          case 'red':
            const red = parseInt(colorCount[1]);
            if (red > ga.red) ga.red = red;
            break;
          case 'green':
            const green = parseInt(colorCount[1]);
            if (green > ga.green) ga.green = green;
            break;
          case 'blue':
            const blue = parseInt(colorCount[1]);
            if (blue > ga.blue) ga.blue = blue;
        }
      });
    });

    ga.power = ga.red * ga.green * ga.blue;
    games.push(ga);

  });

  console.log(games);

  const result = games.reduce((a, b) => a + b.power, 0);

  console.timeEnd();
  return result;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
