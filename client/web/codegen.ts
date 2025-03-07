import type { CodegenConfig } from "@graphql-codegen/cli";
import path from "path";

const srcPath = path.resolve(__dirname, "./src");

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "./src/data/generated/get-sdk.ts": {
      documents: path.join(
        srcPath,
        "/data/documents/*.graphql"
      ),
      schema: path.resolve(srcPath, "../../../server/app/src/schema.graphql"),
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
