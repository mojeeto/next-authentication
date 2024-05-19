import db, { UserType } from "./db";

export function createUser(email: string, password: string) {
  return db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, password).lastInsertRowid;
}

export function getUserByEmail(email: string) {
  return db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as UserType;
}
