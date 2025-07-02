"use server";
import { neon } from "@neondatabase/serverless";
import {
  Patient,
  PatientenMedikament,
  Pflegekraft,
  Wagen,
} from "../types/types";
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

export async function getAvailableWagen() {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`
  SELECT WAGEN.* 
  FROM WAGEN, WAGEN_BUCHUNGEN 
  WHERE WAGEN.kennzeichen = WAGEN_BUCHUNGEN.wagen_kz 
  EXCEPT
  SELECT WAGEN.* 
  FROM WAGEN, WAGEN_BUCHUNGEN 
  WHERE WAGEN.kennzeichen = WAGEN_BUCHUNGEN.wagen_kz 
  AND WAGEN_BUCHUNGEN.ausgabe_datum IS NULL`;
  return response as Wagen[];
}
// this should be an insert into WAGEN_BUCHUNGEN
export async function bookWagen(kennzeichen: string, pflegekraftId: number) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`INSERT INTO WAGEN_BUCHUNGEN (wagen_kz, pflegekraft_id, ausleih_datum, ausgabe_datum) 
  VALUES (${kennzeichen}, ${pflegekraftId}, CURRENT_TIMESTAMP, NULL)`;
  revalidatePath("/dashboard/wagen");
}

export async function getBookedWagen(pflegekraftId: number) {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`SELECT w.* 
    FROM WAGEN w, WAGEN_BUCHUNGEN wb 
    WHERE wb.pflegekraft_id = ${pflegekraftId} 
    AND wb.ausgabe_datum IS NULL 
    AND wb.wagen_kz = w.kennzeichen`;

  return response as Wagen[];
}

// Set ausgabe_datum to today for the booking of this wagen and pflegekraft where ausgabe_datum is NULL
export async function finishWagenBooking(
  kennzeichen: string,
  pflegekraftId: number
) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`UPDATE WAGEN_BUCHUNGEN SET ausgabe_datum = CURRENT_DATE WHERE wagen_kz = ${kennzeichen} AND pflegekraft_id = ${pflegekraftId} AND ausgabe_datum IS NULL`;
  revalidatePath("/dashboard/wagen");
}
