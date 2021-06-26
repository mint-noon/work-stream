import {existsSync} from 'fs-extra'

export default (...paths: string[]): boolean => {
    for (const path of paths) {
        if (!existsSync(path)) {
            throw new Error(`Path is not exist: ${path}`)
        }
    }

    return true
}
