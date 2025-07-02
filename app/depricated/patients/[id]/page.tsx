import { getPatientById } from "@/lib/db/db";
import PatientInfo from "./patient-info";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patientId = Number(id);
  const patient = await getPatientById(patientId);
  if (!patient) {
    return null;
  }
  return <PatientInfo patient={patient} />;
}
