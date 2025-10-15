#!/usr/bin/env node
'use strict'

// Runtime launcher that starts the compiled server without oclif
async function main() {
  try {
    // Initialize DB/DataSource first
    const DataSource = require('./dist/DataSource')
    if (DataSource && typeof DataSource.init === 'function') {
      await DataSource.init()
    }

    // Start HTTP server
    const Server = require('./dist/index')
    if (Server && typeof Server.start === 'function') {
      await Server.start()
      return
    }

    console.error('Failed to start: dist/index missing start()')
    process.exit(1)
  } catch (err) {
    console.error('Startup error:', err)
    process.exit(1)
  }
}

main()


