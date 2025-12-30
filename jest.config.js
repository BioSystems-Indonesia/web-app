/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@/lib/http/WithAuth$": "<rootDir>/__mocks__/WithAuth.ts",
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
  clearMocks: true,
};
