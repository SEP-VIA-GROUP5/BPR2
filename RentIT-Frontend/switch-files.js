const fs = require('fs');

const sourceFile = 'src/environment/environment.dev.ts';
const targetFile = 'src/environment/environment.dev-local.ts';

if (process.env.USE_LOCAL_ENV === 'true') {
  console.log('Preparing mocks for local environment...');
  fs.copyFileSync(sourceFile, targetFile);
}
