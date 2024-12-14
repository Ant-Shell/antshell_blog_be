import { db } from '../config/database.js';
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const migrationsDir = path.join(__dirname, 'migrations');
console.log("Line 10", migrationsDir);
// Function to load all migration files
const loadMigrations = async () => {
    const files = await readdir(migrationsDir);
    console.log("Line 14", files);
    return files.filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
};
// Function to run migrations
const runMigrations = async (direction) => {
    const migrations = await loadMigrations();
    console.log('Loaded migrations:', migrations);
    for (const migration of migrations) {
        const { [direction]: migrationFn } = await import(path.join(migrationsDir, migration));
        if (typeof migrationFn === 'function') {
            console.log(`${direction} migration: ${migration}`);
            console.log(`Starting migration: ${migration}`);
            try {
                await migrationFn(db);
                console.log(`Migration succeeded: ${migration}`);
            }
            catch (error) {
                console.error(`Migration failed: ${migration}`, error);
                throw error;
            }
        }
    }
    console.log('Migrations complete!');
};
// Run migrations
(async () => {
    try {
        await runMigrations('up'); // Change to 'down' for rollback
    }
    catch (error) {
        console.error('Error running migrations:', error);
    }
    finally {
        await db.destroy();
    }
})();
