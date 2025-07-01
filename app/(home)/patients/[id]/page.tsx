import { Button, Frame, TextInput, WindowHeader } from "@/lib/react-95";
import Image from "next/image";

const mockPatients = [
  {
    id: 1,
    name: "Anna Müller",
    alter: 82,
    gewicht: 65.5,
    addresse: "Berliner Str. 12, 10115 Berlin",
    geschlecht: "f",
    pflegekraft_id: 1,
  },
  {
    id: 2,
    name: "Max Mustermann",
    alter: 75,
    gewicht: 80.2,
    addresse: "Hauptstr. 5, 12345 Hamburg",
    geschlecht: "m",
    pflegekraft_id: 2,
  },
  {
    id: 3,
    name: "Dieter Schmidt",
    alter: 90,
    gewicht: 70.0,
    addresse: "Marktplatz 1, 90402 Nürnberg",
    geschlecht: "m",
    pflegekraft_id: 1,
  },
  {
    id: 4,
    name: "Julia Becker",
    alter: 68,
    gewicht: 55.3,
    addresse: "Bahnhofstr. 8, 50667 Köln",
    geschlecht: "f",
    pflegekraft_id: 3,
  },
];
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patientId = Number(id);
  const patient = mockPatients.find((p) => p.id === patientId);
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
                value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
          Patienten Mediakemnte <span className="emoji">💊</span>
        </Button>
        <Button>
          Patienten Behandlungen <span className="emoji">🩻</span>
        </Button>
      </div>
    </div>
  );
}
