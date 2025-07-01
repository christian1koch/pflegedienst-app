import PatientsWindow from "@/app/patients-window";
import { getPatientsByPflegekraftId } from "@/lib/db/db";

export default async function Patients() {
  const patients = await getPatientsByPflegekraftId(5);
  return <PatientsWindow patients={patients} />;
}
