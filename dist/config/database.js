import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
// import { Pool } from 'pg'
import { devEnv } from '../config/environments.js';
const { Pool } = pg;
const dialect = new PostgresDialect({
    pool: new Pool({
        database: devEnv.database,
        host: devEnv.host,
        user: devEnv.user,
        port: devEnv.port,
        max: devEnv.max,
        password: devEnv.password
    })
});
export const db = new Kysely({
    dialect,
});
