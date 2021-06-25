import {vol} from 'memfs'

jest.mock('fs')

import walk from '../utils/walk'

describe(walk, () => {
    beforeEach(() => {
        vol.reset()
    })

    it('Must recursively traverse all files in the directory except ignored ones', () => {
        const exclude = ['.exclude']
        vol.fromJSON({
            '/.exclude': 'Oh no, no',
            '/path/to/file.txt': '',
            '/file-too.txt': '',
            '/path/short.css': ''
        }, '/')

        const collection: string[] = []
        const collect = (file: string) => {
            collection.push(file)
        }

        walk('/', exclude, collect)

        expect(collection.length).toBe(3)
    })
})
