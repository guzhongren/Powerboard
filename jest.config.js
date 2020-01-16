module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@root(.*)$': '<rootDir>/src/$1'
  },
};
