const fileReader = require('./inputParser')
const { CommandCenter } = require('./CommandCenter')

console.log('\n Hello Mars')
console.log('============\n')

fileReader.readInputFile('input.txt')
  .then(missionData => new CommandCenter(missionData))
  .then(commandCenter => {
    commandCenter.runMission()
    console.log(commandCenter.missionStatus())
  })
  .catch(error => console.error(error))
