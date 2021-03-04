module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ['<rootDir>/tests/jest-setup.js'],
  transform: {
    'vee-validate/dist/rules': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!vue2-google-maps|vee-validate/dist/rules)'
  ]
}
