import { getPatientById } from "@/lib/db/db";
import { Button, Frame, TextInput, WindowHeader } from "@/lib/react-95";
import Image from "next/image";

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
    <div className="flex w-full justify-between">
      <div>
        <WindowHeader>
          Patienten Informationen <span className="emoji">ℹ️</span>
        </WindowHeader>
        <Frame variant="well" className="h-fit p-5">
          <div className="flex h-full flex-col">
            <p>Patient: {patient.name}</p>
            <p>Alter: {patient.alter}</p>
            <p>Gewicht: {patient.gewicht}</p>
            <p>Addresse: {patient.addresse}</p>
            <p>Geschlecht: {patient.geschlecht}</p>
            <div className="flex flex-col">
              <WindowHeader className="!bg-yellow-500">
                Patienten Notiz <span className="emoji">📝</span>
              </WindowHeader>
              <TextInput
                variant="flat"
                value={patient.notiz || ""}
                multiline
                rows={5}
                disabled
              />
              <Button className="w-full">
                Notiz bearbeiten <span className="emoji">✏️</span>
              </Button>
            </div>
          </div>
        </Frame>
      </div>
      <Frame shadow>
        <Image alt="old person" src="/old-woman.jpg" width={400} height={600} />
      </Frame>
      <div className="flex flex-row gap-2">
        <Button>
          Medikamente <span className="emoji">💊</span>
        </Button>
        <Button>
          Behandlungen <span className="emoji">🩻</span>
        </Button>
      </div>
    </div>
  );
}
