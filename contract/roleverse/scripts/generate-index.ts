import fs from 'fs'
import glob from 'glob'
import path from 'path'

const rawAbiFilePaths = glob.sync(
  path.join(__dirname, '../artifacts/{contracts,@openzeppelin}/**/*.json'),
)

const abiFilePaths = rawAbiFilePaths.filter(
  (abiFilePath) => !abiFilePath.endsWith('.dbg.json'),
)

const indexPath = path.join(__dirname, `../index.ts`)

let indexContent = ''

abiFilePaths.forEach((abiFilePath) => {
  const abiName = abiFilePath.split('/').pop()?.replace('.json', '')
  const abiContent = require(abiFilePath)

  indexContent += `export const ${abiName}ABI = ${JSON.stringify(abiContent.abi, null, 2)} as const\n`
})

fs.writeFileSync(indexPath, indexContent)
