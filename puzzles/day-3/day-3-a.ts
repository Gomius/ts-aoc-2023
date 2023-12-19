import { readData } from '../../shared.ts';
import chalk from 'chalk';

type num = {
  nb: number,
  line: number,
  position: number,
  isPart: boolean,
}

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  const partNumbers: Array<num> = [];

  for (const [index, line] of data.entries()) {
    const chunks = line.split(/(\d+|\.+)/gi).map(chunk => {
      if (chunk.match(/\d+/)) {
        const position = line.indexOf(chunk);
        let partNumber: num = { 
          nb: parseInt(chunk),
          line: index,
          position: position,
          isPart: false,
        };

        // Same line
        partNumber = checkSameLine(partNumber, line);

        // Previous line
        if (index > 0) {
          partNumber = checkPart(partNumber, data[index-1], 'UP');
        }

        // Next line
        if (index < data.length-1) {
          partNumber = checkPart(partNumber, data[index+1], 'DOWN');
        }

        partNumbers.push(partNumber);
      }
    });
  }

  console.log(partNumbers);

  let response = partNumbers.filter(num => num.isPart)
    .reduce((a, b) => a + b.nb, 0);

  return response;
}

function checkSameLine(chunk: num, line: string): num {
  const len: number = chunk.nb.toString().length;

  if (chunk.isPart) return chunk;

  if (chunk.position > 0) {
    if (!line.charAt(chunk.position - 1).match(/(\d|\.)/)) {
      chunk.isPart = true;
    }
  }

  if (chunk.position + len < line.length) {
    if (!line.charAt(chunk.position + len).match(/(\d|\.)/)) {
      chunk.isPart = true;
    }
  }

  return chunk;
}

function checkPart(chunk: num, line: string, direction: string): num {
  if (chunk.isPart) return chunk;

  const len: number = chunk.nb.toString().length;
  const start: number = (chunk.position > 0) ? chunk.position - 1 : 0
  const end: number = (chunk.position + len < line.length) ? chunk.position + len + 1 : line.length;
  const checkChunk = line.substring(start, end);
  const symbols = checkChunk.split('').filter(chars => !chars.match(/(\d|\.)/));

  
  if (symbols.length > 0) chunk.isPart = true;
  
  console.log(direction, chunk.isPart, chunk.nb, checkChunk, chunk.position, len, start, end, line.charAt(chunk.position));
  return chunk;
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
