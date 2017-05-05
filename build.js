/**
 * This file runs the API Console builder node module to create a bundled file of sources.
 */
const builder = require('api-console-builder');
const fs = require('fs');

builder({
  dest: 'out',
  raml: 'api.raml',
  jsCompilationLevel: 'SIMPLE',
  useJson: true
})
.then(() => {
  console.log('Build complete');
})
.catch((cause) => console.log('Build error', cause.message));
