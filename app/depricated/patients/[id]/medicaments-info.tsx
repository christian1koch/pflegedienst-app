"use client";
import { useEffect, useState } from "react";
import {
  WindowHeader,
  Window,
  WindowContent,
  Hourglass,
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableDataCell,
  Button,
} from "@/lib/react-95";
import { Patient, PatientenMedikament } from "@/lib/types/types";
import { getPatientMedikamente, markMedikamentAsToday } from "@/lib/db/db";

interface PatientMedikamentWindowProps {
  patient: Patient;
}

export function PatientMedikamentWindow({
  patient,
}: PatientMedikamentWindowProps) {
  const [medikamente, setMedikamente] = useState<PatientenMedikament[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedikament, setSelectedMedikament] = useState<
    number | undefined
  >();

  useEffect(() => {
    async function fetchMedikamente() {
      setLoading(true);
      const data = await getPatientMedikamente(patient.id);
      setMedikamente(data);
      setLoading(false);
    }
    fetchMedikamente();
  }, [patient.id]);

  const getEinnahmeTag = (einnahmezeit: Date) => {
    const date = new Date(einnahmezeit);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleMarkToday = async () => {
    if (!selectedMedikament) return;
    await markMedikamentAsToday(selectedMedikament);
    const data = await getPatientMedikamente(patient.id);
    setMedikamente(data);
  };

  console.log(selectedMedikament);

  return (
    <Window className="w-full max-w-lg">
      <WindowHeader>Medikamente von {patient.name}</WindowHeader>
      <WindowContent>
        {loading ? (
          <Hourglass size={32} />
        ) : (
          <div className="flex flex-col gap-2">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Name</TableHeadCell>
                  <TableHeadCell>Dosis</TableHeadCell>
                  <TableHeadCell>Letzter Einnahmetag</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medikamente.map((m) => (
                  <TableRow
                    key={m.id + m.einnahmezeit.toISOString()}
                    className={`cursor-pointer ${
                      selectedMedikament === m.id
                        ? "bg-hover-background !text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedMedikament(m.id)}
                  >
                    <TableDataCell>{m.name}</TableDataCell>
                    <TableDataCell>{m.dosis}</TableDataCell>
                    <TableDataCell>
                      {getEinnahmeTag(m.einnahmezeit)}
                    </TableDataCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              onClick={handleMarkToday}
              disabled={selectedMedikament == null}
            >
              Heute einnehmen markieren <span className="emoji">✅</span>
            </Button>
          </div>
        )}
      </WindowContent>
    </Window>
  );
}
