const packageJson = require('../package.json')

const parts = packageJson.version.split('.')

const major = parseInt(parts[0])

const minor = parseInt(parts[1])

const patch = parseInt(parts[2])

packageJson.version = `${major}.${minor}.${patch+1}`

const fs = require('fs')
const path = require('path')
const savePath = path.resolve(__dirname, '../package.json')

fs.writeFileSync(savePath, JSON.stringify(packageJson, null, 2))
