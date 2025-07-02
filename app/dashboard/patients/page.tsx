import { getPatientsByPflegekraftId } from "@/lib/db/db";
import PatientsWindow from "./patients-window";

export default async function DashboardPatients() {
  const patients = await getPatientsByPflegekraftId(5);
  return <PatientsWindow patients={patients} />;
}
