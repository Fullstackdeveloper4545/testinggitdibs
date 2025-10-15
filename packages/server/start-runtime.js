#!/usr/bin/env node
'use strict'

// Runtime launcher that prefers compiled dist, but falls back to TS sources.
async function main() {
  try {
    let DataSource
    let Server
    try {
      DataSource = require('./dist/DataSource')
      Server = require('./dist/index')
    } catch (_) {
      // dist may not exist; fall back to ts at runtime
      require('ts-node/register')
      DataSource = require('./src/DataSource')
      Server = require('./src/index')
    }

    if (DataSource && typeof DataSource.init === 'function') {
      await DataSource.init()
    }
    if (Server && typeof Server.start === 'function') {
      await Server.start()
      return
    }
    console.error('Failed to start server: start() not found')
    process.exit(1)
  } catch (err) {
    console.error('Startup error:', err)
    process.exit(1)
  }
}

main()


