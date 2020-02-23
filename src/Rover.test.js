const each = require('jest-each').default
const { Rover } = require('./Rover')

describe('Mars Rover', () => {

  it('initializes with valid input data', () => {
    const rover = new Rover({ x: 1, y: 2, direction: 'N' })
    const roverStatus = rover.toString()
    expect(roverStatus).toBe('1 2 N')
  })

  it('fails to initialize with invalid coordinates', () => {
    expect(() => new Rover({ x: -1, y: 2, direction: 'N' })).toThrow(Error)
    expect(() => new Rover({ x: 1, y: -2, direction: 'N' })).toThrow(Error)
    expect(() => new Rover({ x: '1', y: '2', direction: 'N' })).toThrow(Error)
    expect(() => new Rover({ x: 'X', y: 'Y', direction: 'N' })).toThrow(Error)
  })

  it('fails to initialize with invalid direction', () => {
    expect(() => new Rover({ x: 1, y: 2, direction: 'Z' })).toThrow(Error)
    expect(() => new Rover({ x: 1, y: 2, direction: 'n' })).toThrow(Error)
  })

  each([
    [{ x: 1, y: 2, direction: 'N' }, { x: 1, y: 3, direction: 'N' }],
    [{ x: 1, y: 2, direction: 'E' }, { x: 2, y: 2, direction: 'E' }],
    [{ x: 1, y: 2, direction: 'S' }, { x: 1, y: 1, direction: 'S' }],
    [{ x: 1, y: 2, direction: 'W' }, { x: 0, y: 2, direction: 'W' }]
  ])
    .test('executes the command to move forward from %o to %o', (origin, destination) => {
      const rover = new Rover(origin)
      rover.execute('M')
      expect(rover).toEqual(new Rover(destination))
    })

  each([
    [{ x: 1, y: 2, direction: 'N' }, { x: 1, y: 2, direction: 'E' }],
    [{ x: 1, y: 2, direction: 'E' }, { x: 1, y: 2, direction: 'S' }],
    [{ x: 1, y: 2, direction: 'S' }, { x: 1, y: 2, direction: 'W' }],
    [{ x: 1, y: 2, direction: 'W' }, { x: 1, y: 2, direction: 'N' }]
  ])
    .test('executes the command to turn right from %o to %o', (origin, destination) => {
      const rover = new Rover(origin)
      rover.execute('R')
      expect(rover).toEqual(new Rover(destination))
    })

  each([
    [{ x: 1, y: 2, direction: 'N' }, { x: 1, y: 2, direction: 'W' }],
    [{ x: 1, y: 2, direction: 'E' }, { x: 1, y: 2, direction: 'N' }],
    [{ x: 1, y: 2, direction: 'S' }, { x: 1, y: 2, direction: 'E' }],
    [{ x: 1, y: 2, direction: 'W' }, { x: 1, y: 2, direction: 'S' }]
  ])
    .test('executes the command to turn left from %o to %o', (origin, destination) => {
      const rover = new Rover(origin)
      rover.execute('L')
      expect(rover).toEqual(new Rover(destination))
    })

  it('ignores invalid commands', () => {
    const rover = new Rover({ x: 1, y: 2, direction: 'N' })
    rover.execute('X')
    expect(rover).toEqual(new Rover({ x: 1, y: 2, direction: 'N' }))
  })

})