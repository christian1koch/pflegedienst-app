import { Patient } from "@/lib/types/types";
import { getGeschlecht } from "@/lib/helpers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Breadcrumbs from "../../breadcrumbs";

export default function PatientInfo({ patient }: { patient: Patient }) {
  let imageSrc = "/old-man.jpg";
  if (patient.geschlecht === "f") imageSrc = "/old-woman.jpg";
  else if (patient.geschlecht === "m") imageSrc = "/old-man.jpg";
  else imageSrc = "/old-man.jpg";

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center">
      <Breadcrumbs
        items={[
          { title: "Home", url: "/dashboard" },
          { title: "Patienten", url: "/dashboard/patients" },
        ]}
        currentPage={patient.name}
      />
      <div className="flex w-full justify-center">
        <Card className="mt-4 w-full max-w-lg">
          <CardHeader className="flex flex-col items-center gap-2 pb-0">
            <img
              src={imageSrc}
              alt="Patientenbild"
              className="border-primary mb-2 h-32 w-32 rounded-full border-4 object-cover shadow-md"
            />
            <CardTitle className="text-center text-2xl font-bold">
              {patient.name}
            </CardTitle>
            <CardDescription className="text-center">
              {getGeschlecht(patient.geschlecht)}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2 space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold">Alter:</span>
              <span>{patient.alter}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Adresse:</span>
              <span>{patient.addresse}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Gewicht:</span>
              <span>{patient.gewicht} kg</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Notiz:</span>
              <span className="text-muted-foreground whitespace-pre-line">
                {patient.notiz || (
                  <span className="italic">Keine Notiz vorhanden.</span>
                )}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
