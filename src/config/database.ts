import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { BPDB } from '../types.js'
import { Env } from '../config/environments.js'

const { Pool } = pg

const dialect = new PostgresDialect({
  pool: new Pool({
    database: Env.database,
    host: Env.host,
    user: Env.user,
    port: Env.port,
    max: Env.max,
    password: Env.password
  })
})

export const db = new Kysely<BPDB>({
  dialect,
})