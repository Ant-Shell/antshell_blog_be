const prefix = process.env

interface Env {
  database: string | undefined
  host: string | undefined
  user: string | undefined
  port: number | undefined
  max: number | undefined
  password: string | undefined
}

export const devEnv: Env = {
  database: prefix.DATABASE,
  host: prefix.HOST,
  user: prefix.USER,
  port: Number(prefix.PORT),
  max: Number(prefix.MAX),
  password: prefix.PASSWORD
}