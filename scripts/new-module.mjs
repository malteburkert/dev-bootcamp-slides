#!/usr/bin/env node
/* Copy a deck template into a module folder: bun run new <slug> <slidev|ts> */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [slug, format] = process.argv.slice(2)

if (!slug || !['slidev', 'ts'].includes(format ?? '')) {
  console.error('Usage: bun run new <module-slug> <slidev|ts>')
  process.exit(1)
}

const moduleDir = path.join(root, 'modules', slug)
const templateDir = path.join(root, 'templates', format)

if (fs.existsSync(path.join(moduleDir, 'package.json'))) {
  console.error(`modules/${slug} already has a deck (package.json found). Remove it first if you want to switch formats.`)
  process.exit(1)
}

const skip = new Set(['node_modules', 'dist', 'dist-print'])
fs.mkdirSync(moduleDir, { recursive: true })
fs.cpSync(templateDir, moduleDir, {
  recursive: true,
  filter: (src) => !src.split(path.sep).some((part) => skip.has(part)),
})

const pkgPath = path.join(moduleDir, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
pkg.name = slug
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

console.log(`Created ${format} deck in modules/${slug}`)
console.log('Next steps:')
console.log('  bun install')
console.log(`  bun run --cwd modules/${slug} dev`)
console.log(
  format === 'slidev'
    ? `  edit the deck title in modules/${slug}/slides.md`
    : `  edit the deck title in modules/${slug}/src/slides.tsx and index.html`,
)
