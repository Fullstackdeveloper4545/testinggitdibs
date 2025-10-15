#!/usr/bin/env node

// Simple launcher to start the Flowise server via oclif without relying on dist/index.js
try {
    const oclif = require('@oclif/core')
    oclif
        .run(['start'])
        .then(require('@oclif/core/flush'))
        .catch(require('@oclif/core/handle'))
} catch (e) {
    console.error('Failed to start Flowise:', e)
    process.exit(1)
}


