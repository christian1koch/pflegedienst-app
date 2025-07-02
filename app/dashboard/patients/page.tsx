import { getPatientsByPflegekraftId } from "@/lib/db/db";
import { PFLEGEKRAFT_ID } from "@/lib/types/constants";
import PatientsWindow from "./patients-window";

export default async function DashboardPatients() {
  const patients = await getPatientsByPflegekraftId(PFLEGEKRAFT_ID);
  return <PatientsWindow patients={patients} />;
}
