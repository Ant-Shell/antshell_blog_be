import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
  .createTable('public.users')
  .addColumn('id', 'serial', (col) => col.primaryKey())
  .addColumn('user_id', 'uuid', (col) => col.notNull().defaultTo(sql`gen_random_uuid()`))
  .addColumn('username', 'varchar', (col) => col.notNull().unique())
  .addColumn('password', 'varchar', (col) => col.notNull())
  .addColumn('admin', 'boolean', (col) => col.notNull().defaultTo(sql`false`))
  .execute()

  await db.schema
    .createTable('public.categories')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull().unique())
    .addColumn('slug', 'varchar', (col) => col.notNull().unique())
    .addColumn('description', 'text', (col) => col.defaultTo(null))
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(null))
    .execute()

  await db.schema
    .createTable('public.posts')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('title', 'varchar', (col) => col.notNull())
    .addColumn('content', 'text', (col) => col.notNull())
    .addColumn('user_id', 'integer', (col) =>
      col.references('users.id').onDelete('cascade').notNull()
    )
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(null))
    .execute()

  await db.schema
    .createTable('public.post_categories') // Junction table
    .addColumn('post_id', 'integer', (col) =>
      col.references('posts.id').onDelete('cascade').notNull()
    )
    .addColumn('category_id', 'integer', (col) =>
      col.references('categories.id').onDelete('cascade').notNull()
    )
    .addPrimaryKeyConstraint('post_categories_pkey', ['post_id', 'category_id'])
    .execute();

  await db.schema
    .createTable('public.tags')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull().unique())
    .execute()

  await db.schema
    .createTable('public.post_tags') // Junction table
    .addColumn('post_id', 'integer', (col) =>
      col.references('posts.id').onDelete('cascade').notNull()
    )
    .addColumn('tag_id', 'integer', (col) => 
      col.references('tags.id').onDelete('cascade').notNull()
    )
    .addPrimaryKeyConstraint('pk_post_tags', ['post_id', 'tag_id'])
    .execute()

  await db.schema
    .createTable('public.images')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('post_id', 'integer', (col) => col.references('posts.id').onDelete('cascade'))
    .addColumn('url', 'varchar', (col) => col.notNull())
    .addColumn('type', 'varchar', (col) => col.notNull())
    .addColumn('alt_text', 'text', (col) => col.defaultTo(null))
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('public.post_categories').execute();
  await db.schema.dropTable('public.post_tags').execute()
  await db.schema.dropTable('public.images').execute()
  await db.schema.dropTable('public.categories').execute()
  await db.schema.dropTable('public.posts').execute()
  await db.schema.dropTable('public.tags').execute()
  await db.schema.dropTable('public.users').execute()
}