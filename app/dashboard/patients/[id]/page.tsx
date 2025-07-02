import { getPatientById } from "@/lib/db/db";
import PatientInfo from "./patient-info";

export default async function Page({ params }: { params: { id: string } }) {
  const patientId = Number(params.id);
  const patient = await getPatientById(patientId);
  if (!patient) {
    return null;
  }
  return <PatientInfo patient={patient} />;
}
