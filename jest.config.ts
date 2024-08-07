import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom", 
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx", "**/*.test.jsx"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(your-module-to-transform|other-modules-to-transform)/)",
  ],
  setupFilesAfterEnv: ["./setupTests.ts"],
};

export default config;
