import type { CodegenConfig } from '@graphql-codegen/cli'
import path from 'path'

const srcPath = path.resolve(__dirname, './src')

const ROLEVERSE_GRAPHQL_ENDPOINT_FALLBACK =
  'http://localhost:8000/subgraphs/name/roleverse-local'

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    './src/generated/get-sdk.ts': {
      documents: `${srcPath}/documents/graph/*.graphql`,
      schema:
        process.env.ROLEVERSE_GRAPHQL_ENDPOINT ??
        ROLEVERSE_GRAPHQL_ENDPOINT_FALLBACK,
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        useTypeImports: true,
      },
    },
  },
}

export default config
