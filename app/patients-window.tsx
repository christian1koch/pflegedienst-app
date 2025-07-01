"use client";
import { Patient } from "@/lib/types/types";
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

export default function PatientsWindow({ patients }: { patients: Patient[] }) {
  return (
    <Window className="h-full w-full">
      <WindowHeader>Your Patients</WindowHeader>
      <WindowContent className="flex h-full w-full flex-col justify-center align-middle">
        <PatientTable patients={patients} />
      </WindowContent>
    </Window>
  );
}

function PatientTable({ patients }: { patients: Patient[] }) {
  const [search, setSearch] = useState("");

  const filtered = patients.filter(
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
