const inputParser = require('./inputParser')
const mockFs = require('mock-fs')


const mockInputFile = content => mockFs({ 'input.txt': content })
const filename = 'input.txt'

describe('The Input Parser', () => {

  afterEach(() => mockFs.restore())

  it('parses the size of the plateau', async () => {
    mockInputFile('5 5')

    const result = await inputParser.readInputFile(filename)
    expect(result.plateau).toEqual({ maxX: 5, maxY: 5 })
  })

  it('parses the location and command of a mars rover', async () => {
    mockInputFile('5 5\n1 2 N\nLMLMLMLMM')

    const result = await inputParser.readInputFile(filename)
    expect(result.rovers[ 0 ]).toEqual({ x: 1, y: 2, direction: 'N', command: 'LMLMLMLMM' })
  })

  it('parses the location and command of multiple mars rover', async () => {
    mockInputFile('5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM')

    const result = await inputParser.readInputFile(filename)
    expect(result.rovers[ 0 ]).toEqual({ x: 1, y: 2, direction: 'N', command: 'LMLMLMLMM' })
    expect(result.rovers[ 1 ]).toEqual({ x: 3, y: 3, direction: 'E', command: 'MMRMMRMRRM' })
  })

  // ¯\_(ツ)_/¯
  // Could check on invalid file format cases
  // Or invalid values in the content of the file
  // But let's assume for now the file will be always valid
  // ¯\_(ツ)_/¯

})
