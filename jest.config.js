/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  testMatch: [
    "<rootDir>/src/**/__test__/**/*.test.{js,ts}",
    "<rootDir>/src/**/*.test.{js,ts}"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!src/**/*.d.ts",
    "!src/**/__test__/**",
  ],
  setupFilesAfterEnv: [],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/"
  ]
}
