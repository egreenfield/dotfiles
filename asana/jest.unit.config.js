var config = require('./jest.config')

config.testRegex = "(/__tests__/.*\\.unit\\..*|(\\.|/)unit\\.(test|spec))\\.tsx?$"

module.exports = config
