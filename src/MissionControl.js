const { Rover } = require('./Rover')

class MissionControl {
  constructor(missionData) {
    if (!missionData.plateau || !missionData.plateau.maxX || !missionData.plateau.maxY)
      throw new Error('Plateau data is missing')
    if (!missionData.rovers || missionData.rovers.length === 0)
      throw new Error('Rovers data is missing')

    this.grid = missionData.plateau
    this.rovers = missionData.rovers.map(rover => new Rover(rover))
    this.commands = missionData.rovers.map(rover => rover.command)
  }

  run() {
    for(let i = 0; i < this.rovers.length; i++) {
      const rover = this.rovers[i]
      const command = this.commands[i]
      for(let j = 0; j < command.length; j++) {
        rover.execute(command[j])
      }
    }
    return this
  }

  status() {
    return this.rovers
      .map(rover => rover.toString())
      .join('\n')
  }
}

module.exports = { MissionControl }
