import db from "./db";

export function createUser(email: string, password: string) {
  return db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, password).lastInsertRowid;
}
