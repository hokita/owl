import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema:
    "https://raw.githubusercontent.com/hokita/owl/refs/heads/main/backend/graph/schema.graphqls",
  documents: ["src/**/*.vue", "src/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
        scalars: {
          DateTime: "string",
        },
        preResolveTypes: true,
        avoidOptionals: true,
      },
    },
  },
};

export default config;
