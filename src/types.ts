import {
  ColumnType,
  Generated,
  Insertable,
  // JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely'

export interface BPDB {
  category: CategoryTable
  comment: CommentTable
  file: FileTable
  post: PostTable
  postTag: PostTagTable
  tag: TagTable
  user: UserTable
}

export interface CategoryTable {
  id: Generated<number>
  categoryId: number
  name: string
  description: string
}

export type Category = Selectable<CategoryTable>
export type NewCategory = Insertable<CategoryTable>
export type CategoryUpdate = Updateable<CategoryTable>

export interface CommentTable {
  id: Generated<number>
  commentId: number
  postId: number
  body: string
  date: ColumnType<Date, string | undefined, never>
  updateDate: ColumnType<Date, string | undefined>
}

export type Comment = Selectable<CommentTable>
export type NewComment = Insertable<CommentTable>
export type CommentUpdate = Updateable<CommentTable>

export interface FileTable {
  id: Generated<number>
  fileId: number
  postId: number
  name: string
  type: string
  path: string
  uploadDate: ColumnType<Date, string | undefined, never>
}

export type File = Selectable<FileTable>
export type NewFile = Insertable<FileTable>
export type FileUpdate = Updateable<FileTable>

export interface PostTable {
  id: Generated<number>
  postId: number
  categoryId: number
  userId: number
  title: string
  content: string
  postDate: ColumnType<Date, string | undefined, never>
  updateDate: ColumnType<Date, string | undefined>
}

export type Post = Selectable<PostTable>
export type NewPost = Insertable<PostTable>
export type PostUpdate = Updateable<PostTable>

export interface PostTagTable {
  postId: number
  tagId: number
}

export type PostTag = Selectable<PostTagTable>
export type NewPostTag = Insertable<PostTagTable>
export type PostTagUpdate = Updateable<PostTagTable>

export interface TagTable {
  id: Generated<number>
  tagId: number
  name: string
}

export type Tag = Selectable<TagTable>
export type NewTag = Insertable<TagTable>
export type TagUpdate = Updateable<TagTable>

export interface UserTable {
  id: Generated<number>
  userId: number
  username: string
  password: string
  email: string
  admin: boolean
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>
