import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const schemaPath = fileURLToPath(new URL('../data/schema.json', import.meta.url))
const response = await fetch('https://api.zotero.org/schema', {
  headers: {
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip',
  },
})

if (!response.ok) {
  throw new Error(`Failed to fetch Zotero schema: ${response.status} ${response.statusText}`)
}

const schema = await response.json()
if (!Number.isInteger(schema.version) || !Array.isArray(schema.itemTypes)) {
  throw new Error('The Zotero schema response is missing a valid version or itemTypes list')
}

const currentSchema = JSON.parse(await readFile(schemaPath, 'utf8'))
if (JSON.stringify(schema) !== JSON.stringify(currentSchema)) {
  await writeFile(schemaPath, `${JSON.stringify(schema, null, 2)}\n`)
  console.info(`Updated Zotero schema to version ${schema.version}`)
}
else {
  console.info(`Zotero schema is up to date (version ${schema.version})`)
}
