import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import { up as migrationFn } from './migrations/2024-11-21_create_tables.js';
const { Pool } = pg;
const db = new Kysely({
    dialect: new PostgresDialect({
        pool: new Pool({
            host: 'localhost',
            port: 5432,
            database: 'BPDB',
            user: 'postgres',
            password: '!tAd3@6Xd1E2R41z',
        }),
    }),
});
(async () => {
    try {
        console.log('Testing migration...');
        await migrationFn(db);
        console.log('Migration executed successfully!');
    }
    catch (error) {
        console.error('Error during migration:', error);
    }
    finally {
        await db.destroy();
    }
})();
