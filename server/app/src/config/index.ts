const requireEnvVariable = (name: string) => {
  if (typeof process.env[name] !== 'string') {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return process.env[name]!
}

const config = (() => {
  return {
    environment: process.env.NODE_ENV || 'development',
    port: requireEnvVariable('SERVER_PORT'),
    host: requireEnvVariable('SERVER_HOST'),
    cors_origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    db: {
      name: requireEnvVariable('DB_NAME'),
      port: requireEnvVariable('DB_PORT'),
      host: requireEnvVariable('DB_HOST'),
      username: requireEnvVariable('DB_USERNAME'),
      password: requireEnvVariable('DB_PASSWORD'),
    },
    auth: {
      jwt_secret: requireEnvVariable('JWT_SECRET'),
    },
    graph: {
      roleverse_graphql_endpoint: process.env.ROLEVERSE_GRAPHQL_ENDPOINT,
    },
  }
})()

export default config
