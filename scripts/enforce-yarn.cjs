#!/usr/bin/env node

const userAgent = process.env.npm_config_user_agent || ''
const execPath = process.env.npm_execpath || ''

const isYarn = userAgent.includes('yarn/') || execPath.toLowerCase().includes('yarn')

if (!isYarn) {
  console.error('\nThis project only supports Yarn commands.')
  console.error('Use "yarn dev" instead of "npm run dev".\n')
  process.exit(1)
}
