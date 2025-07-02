"use client";
import { getGeschlecht } from "@/lib/helpers";
import { Patient } from "@/lib/types/types";
import Link from "next/link";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "../breadcrumbs";

export default function PatientsWindow({ patients }: { patients: Patient[] }) {
  return (
    <div className="h-full w-full">
      <Breadcrumbs
        items={[{ title: "Home", url: "/dashboard" }]}
        currentPage="Deine Patienten"
      />
      <PatientTable patients={patients} />
    </div>
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
    <div className="flex w-full flex-col gap-5 rounded-md border p-4">
      <Input
        placeholder="Suche Patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-0 max-w-md pb-0"
      />
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Liste deiner Patienten</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Alter</TableHead>
              <TableHead>Geschlecht</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow
                key={p.id}
                onClick={() => setSelectedPatient(p.id)}
                data-state={p.id === selectedPatient ? "selected" : undefined}
                className="cursor-pointer"
              >
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.alter}</TableCell>
                <TableCell>{getGeschlecht(p.geschlecht)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Link
        className={
          isButtonDisabled ? "pointer-events-none" : "pointer-events-auto"
        }
        href={`patients/${selectedPatient}`}
      >
        <Button disabled={isButtonDisabled}>See More Info...</Button>
      </Link>
    </div>
  );
}
