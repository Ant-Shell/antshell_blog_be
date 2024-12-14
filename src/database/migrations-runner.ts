import { db } from '../config/database.js'
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const migrationsDir = path.join(__dirname, 'migrations');

// Function to load all migration files
const loadMigrations = async () => {
  const files = await readdir(migrationsDir);
  return files.filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
};

// Function to run migrations
const runMigrations = async (direction: 'up' | 'down') => {
  const migrations = await loadMigrations();
  for (const migration of migrations) {
    const { [direction]: migrationFn } = await import(path.join(migrationsDir, migration));
    if (typeof migrationFn === 'function') {
      try {
        await migrationFn(db);
        console.log(`Migration succeeded: ${migration}`)
      } catch (error) {
        console.error(`Migration failed: ${migration}`, error)
        throw error
      }
    }
  }
  console.log('Migrations complete!');
};

// Run migrations
(async () => {
  try {
    const direction = process.argv[2]
    console.log("Direction:", direction)

    if (!direction || (direction !== 'up' && direction !== 'down')) {
      throw new Error('Please provide "up" or "down" as an argument.')
    }

    await runMigrations(direction)
  } catch (error) {
    console.error('Error running migrations:', error)
    throw error
  } finally {
    await db.destroy();
  }
})();