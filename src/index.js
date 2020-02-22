const fileReader = require('./inputParser')

console.log('\n Hello Mars')
console.log('============\n')

console.log('Reading data...\n')
fileReader.readInputFile('input.txt')
  .then(parsed => JSON.stringify(console.log(parsed)))
  .catch(error => console.error(error))
