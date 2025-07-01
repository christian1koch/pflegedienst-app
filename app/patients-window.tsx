"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableDataCell,
  TableBody,
  TextField,
  Window,
  WindowContent,
  TableHeadCell,
  WindowHeader,
  Button,
} from "react95";

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

export default function SearchablePatientTable() {
  return (
    <Window className="h-full w-full">
      <WindowHeader>Your Patients</WindowHeader>
      <WindowContent className="flex h-full w-full flex-col justify-center align-middle">
        <PatientTable />
      </WindowContent>
    </Window>
  );
}

function PatientTable() {
  const [search, setSearch] = useState("");

  const filtered = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.addresse.toLowerCase().includes(search.toLowerCase()) ||
      p.geschlecht.toLowerCase().includes(search.toLowerCase())
  );
  const [selectedPatient, setSelectedPatient] = useState<number | undefined>();
  const isButtonDisabled = selectedPatient == null;
  return (
    <div>
      <TextField
        placeholder="Suche Patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />
      <div className="flex flex-col gap-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Alter</TableHeadCell>
              <TableHeadCell>Geschlecht</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((p) => (
              <TableRow
                key={p.id}
                onClick={() => setSelectedPatient(p.id)}
                className={
                  p.id === selectedPatient
                    ? "bg-hover-background !text-white"
                    : ""
                }
              >
                <TableDataCell>{p.name}</TableDataCell>

                <TableDataCell>{p.alter}</TableDataCell>
                <TableDataCell>{p.geschlecht}</TableDataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Link
          className={
            isButtonDisabled ? "pointer-events-none" : "pointer-events-auto"
          }
          href={`patients/${selectedPatient}`}
        >
          <Button disabled={isButtonDisabled}>See More Info...</Button>
        </Link>
      </div>
    </div>
  );
}
