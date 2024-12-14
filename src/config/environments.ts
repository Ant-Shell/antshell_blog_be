interface Env {
  database: string | undefined
  host: string | undefined
  user: string | undefined
  port: number | undefined
  max: number | undefined
  password: string | undefined
}

export const Env: Env = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  max: Number(process.env.DB_MAX),
  password: process.env.DB_PASSWORD
}