const { MissionControl } = require('./MissionControl')

describe('Mission Control', () => {

  it('aborts a mission if the plateau info is missing', () => {
    const missionData = {
      rovers: [
        { x: 1, y: 2, direction: 'N', command: 'LMLMLMLMM' },
        { x: 3, y: 3, direction: 'E', command: 'MMRMMRMRRM' }
      ]
    }
    expect(() => new MissionControl(missionData)).toThrow(Error)

    const missionData2 = {
      plateau: {},
      rovers: [
        { x: 1, y: 2, direction: 'N', command: 'LMLMLMLMM' },
        { x: 3, y: 3, direction: 'E', command: 'MMRMMRMRRM' }
      ]
    }
    expect(() => new MissionControl(missionData2)).toThrow(Error)
  })

  it('aborts a mission if there are no rovers', () => {
    const missionData = {
      plateau: { maxX: 5, maxY: 5 },
    }
    expect(() => new MissionControl(missionData)).toThrow(Error)
    const missionData2 = {
      plateau: { maxX: 5, maxY: 5 },
      rovers: []
    }
    expect(() => new MissionControl(missionData2)).toThrow(Error)
  })

  it('initialize a mission when the mission data is valid', () => {
    const missionData = {
      plateau: { maxX: 5, maxY: 5 },
      rovers: [
        { x: 1, y: 2, direction: 'N', command: 'LMLMLMLMM' },
        { x: 3, y: 3, direction: 'E', command: 'MMRMMRMRRM' }
      ]
    }

    const missionControl = new MissionControl(missionData)
    expect(missionControl.status()).toEqual('1 2 N\n3 3 E')
    expect(missionControl.commands).toEqual(['LMLMLMLMM', 'MMRMMRMRRM'])
  })

  it('runs a full mission', () => {
    const missionData = {
      plateau: { maxX: 5, maxY: 5 },
      rovers: [
        { x: 1, y: 2, direction: 'N', command: 'LMLMLMLMM' },
        { x: 3, y: 3, direction: 'E', command: 'MMRMMRMRRM' }
      ]
    }
    const missionControl = new MissionControl(missionData)
    missionControl.run()

    expect(missionControl.status()).toEqual('1 3 N\n5 1 E')
  })

  // ¯\_(ツ)_/¯
  // Extra points:
  // Detect collisions between Rovers
  // Detect if Rovers are going outside the Plateau
  // ¯\_(ツ)_/¯

})
