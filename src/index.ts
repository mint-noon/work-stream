import walk from './utils/walk'

const collection: string[] = []

walk('/home/sup/Projects/wost', ['node_modules', '.git'], collection.push.bind(collection))

console.log(collection)
