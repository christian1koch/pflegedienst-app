"use server";
import { neon } from "@neondatabase/serverless";
import { Patient, PatientenMedikament, Pflegekraft } from "../types/types";
import { revalidatePath } from "next/cache";

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

export async function updatePatientNotiz(id: number, notiz: string) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`UPDATE patient SET notiz = ${notiz} WHERE id = ${id}`;
  revalidatePath(`/patients/${id}`);
}

export async function getPatientMedikamente(patientId: number) {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`
    SELECT m.id, pm.patienten_id, m.name, pm.dosis, pm.einnahmezeit
    FROM patienten_medikamente pm
    JOIN medikament m ON pm.medikament_id = m.id
    WHERE pm.patienten_id = ${patientId}
    ORDER BY pm.einnahmezeit DESC
  `;
  return response as PatientenMedikament[];
}

export async function markMedikamentAsToday(medikamentId: number) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`UPDATE patienten_medikamente SET einnahmezeit = CURRENT_DATE WHERE medikament_id = ${medikamentId}`;
}
