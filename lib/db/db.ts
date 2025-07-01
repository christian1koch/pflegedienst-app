import { neon } from "@neondatabase/serverless";
import { Patient, Pflegekraft } from "../types/types";

export async function getPatients() {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`SELECT * FROM patient`;
  return response as Patient[];
}

export async function getPflegekraftById(id: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`SELECT * FROM pflegekraft WHERE id = ${id}`;
  return response[0] as Pflegekraft;
}

export async function getPatientsByPflegekraftId(pflegekraftId: number) {
  const sql = neon(process.env.DATABASE_URL!);
  const response =
    await sql`SELECT * FROM patient WHERE pflegekraft_id = ${pflegekraftId}`;
  return response as Patient[];
}

export async function getPatientById(id: number) {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`SELECT * FROM patient WHERE id = ${id}`;
  return response[0] as Patient;
}
