import { getPatientById } from "@/lib/db/db";
import PatientInfo from "./patient-info";
import { PatientMedikamentWindow } from "./medicaments-info";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "./breadcrumbs";

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
  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <Breadcrumbs
        className="self-start text-sm"
        items={[
          { title: "Home", url: "/dashboard" },
          { title: "Patienten", url: "/dashboard/patients" },
        ]}
        currentPage={patient.name}
      />
      <div className="align-center m-auto flex h-full flex-col items-center justify-center gap-4">
        <PatientInfo patient={patient} />
        <div className="m-auto mt-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Medikamente anzeigen</Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-2xl">
              <PatientMedikamentWindow patient={patient} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
