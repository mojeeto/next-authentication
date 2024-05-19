import db, { TrainingType } from "./db";

export function getTrainings(): TrainingType[] {
  const stmt = db.prepare("SELECT * FROM trainings");
  return stmt.all();
}
