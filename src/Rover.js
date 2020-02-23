class Rover {
  constructor(roverData) {
    if ( !Number.isInteger(roverData.x) || roverData.x < 0 )
      throw new Error('Invalid X coordinate')
    if ( !Number.isInteger(roverData.y) || roverData.y < 0 )
      throw new Error('Invalid Y coordinate')
    if ( !['N', 'E', 'S', 'W'].includes(roverData.direction) )
      throw new Error('Invalid direction')

    this.x = roverData.x
    this.y = roverData.y
    this.direction = roverData.direction
  }

  execute(command) {
    if ( command === 'M' ) this._moveForward()
    if ( command === 'R' ) this._turnRight()
    if ( command === 'L' ) this._turnLeft()
  }

  toString() {
    return `${ this.x } ${ this.y } ${ this.direction }`
  }

  _moveForward() {
    if ( this.direction === 'N' ) this.y += 1
    if ( this.direction === 'E' ) this.x += 1
    if ( this.direction === 'S' ) this.y -= 1
    if ( this.direction === 'W' ) this.x -= 1
  }

  _turnRight() {
    if ( this.direction === 'N' ) this.direction = 'E'
    else if ( this.direction === 'E' ) this.direction = 'S'
    else if ( this.direction === 'S' ) this.direction = 'W'
    else if ( this.direction === 'W' ) this.direction = 'N'
  }

  _turnLeft() {
    if ( this.direction === 'N' ) this.direction = 'W'
    else if ( this.direction === 'E' ) this.direction = 'N'
    else if ( this.direction === 'S' ) this.direction = 'E'
    else if ( this.direction === 'W' ) this.direction = 'S'
  }
}

module.exports = {
  Rover
}
