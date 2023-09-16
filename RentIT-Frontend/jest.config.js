module.exports = {
  preset: 'jest-preset-angular',
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|lodash-es|ngx-quill|@ngrx)|rxjs'],
  testRegex: '\\.spec\\.ts$',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
    '^@core/(.*)': '<rootDir>/src/app/core/$1',
  },
};
