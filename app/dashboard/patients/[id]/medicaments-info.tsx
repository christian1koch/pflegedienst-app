"use client";
import { useEffect, useState } from "react";
import { Patient, PatientenMedikament } from "@/lib/types/types";
import { getPatientMedikamente, markMedikamentAsToday } from "@/lib/db/db";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchMedikamente() {
      setLoading(true);
      const data = await getPatientMedikamente(patient.id);
      setMedikamente(data);
      setLoading(false);
    }
    fetchMedikamente();
  }, [patient.id]);

  const getEinnahmeTag = (einnahmezeit: Date | string) => {
    const date = new Date(einnahmezeit);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleMarkToday = async () => {
    if (!selectedMedikament) return;
    setSaving(true);
    await markMedikamentAsToday(selectedMedikament);
    const data = await getPatientMedikamente(patient.id);
    setMedikamente(data);
    setSaving(false);
  };

  return (
    <div className="mx-auto mt-6 w-full max-w-lg">
      <h2 className="mb-4 text-center text-lg font-bold">
        Medikamente von {patient.name}
      </h2>
      {loading ? (
        <div className="flex items-center justify-center py-8">Lade...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <Table>
            <TableCaption>Liste der Medikamente</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Dosis</TableHead>
                <TableHead>Letzter Einnahmetag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medikamente.map((m) => (
                <TableRow
                  key={m.id + String(m.einnahmezeit)}
                  onClick={() => setSelectedMedikament(m.id)}
                  data-state={
                    selectedMedikament === m.id ? "selected" : undefined
                  }
                  className="cursor-pointer"
                >
                  <TableCell>{m.name}</TableCell>
                  <TableCell>{m.dosis}</TableCell>
                  <TableCell>{getEinnahmeTag(m.einnahmezeit)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            onClick={handleMarkToday}
            disabled={selectedMedikament == null || saving}
            className="self-end"
          >
            Heute einnehmen markieren
          </Button>
        </div>
      )}
    </div>
  );
}
