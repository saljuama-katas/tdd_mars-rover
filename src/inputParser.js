const fs = require('fs').promises

const readInputFile = inputFile =>
  fs.readFile(inputFile, 'utf8')
    .then(data => data.split('\n'))
    .then(lines => ({ plateau: parsePlateauSize(lines[0]), rovers: parseRovers(lines.slice(1)) }))
    .catch(console.error)

const parsePlateauSize = plateauInformationLine => {
  const plateauSize = plateauInformationLine.split(' ').map(x => parseInt(x))
  return { maxX: plateauSize[0], maxY: plateauSize[1] }
}

const parseRovers = lines => {
  const rovers = []
  for ( let i = 0 ; i < lines.length ; i += 2 ) {
    const position = lines[i].split(' ')
    rovers.push({ x: parseInt(position[0]), y: parseInt(position[1]), direction: position[2], command: lines[i + 1] })
  }
  return rovers
}

module.exports = {
  readInputFile
}
