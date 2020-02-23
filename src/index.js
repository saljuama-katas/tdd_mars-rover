const fileReader = require('./inputParser')
const { MissionControl } = require('./MissionControl')

console.log('\n Hello Mars')
console.log('============\n')

fileReader.readInputFile('input.txt')
  .then(missionData => new MissionControl(missionData))
  .then(missionControl => missionControl.run())
  .then(missionControl => console.log(missionControl.status()))
  .catch(error => console.error(error))
