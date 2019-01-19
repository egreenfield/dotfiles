var config = require('./jest.config')

config.testRegex = "(/__tests__/.*\\.integration\\..*|(\\.|/)integration\\.(test|spec))\\.tsx?$"
config.timeout
module.exports = config
