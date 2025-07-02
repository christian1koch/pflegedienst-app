"use client";
import { useState } from "react";
import { Patient } from "@/lib/types/types";
import { getGeschlecht } from "@/lib/helpers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updatePatientNotiz } from "@/lib/db/db";

export default function PatientInfo({ patient }: { patient: Patient }) {
  let imageSrc = "/old-man.jpg";
  if (patient.geschlecht === "f") imageSrc = "/old-woman.jpg";
  else if (patient.geschlecht === "m") imageSrc = "/old-man.jpg";
  else imageSrc = "/old-man.jpg";

  let badgeColor = "bg-blue-600 text-white";
  if (patient.geschlecht === "f") badgeColor = "bg-pink-500 text-white";
  else if (patient.geschlecht === "d") badgeColor = "bg-purple-600 text-white";

  const [notiz, setNotiz] = useState(patient.notiz || "");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await updatePatientNotiz(patient.id, notiz);
    setIsEditing(false);
    setSaving(false);
  };

  const handleCancel = () => {
    setNotiz(patient.notiz || "");
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-[60vh] w-full">
      <div className="flex w-full">
        <Card className="mt-4 w-full max-w-lg">
          <CardHeader className="flex flex-col items-center gap-2 pb-0">
            <img
              src={imageSrc}
              alt="Patientenbild"
              className="border-primary mb-2 h-32 w-32 rounded-full border-4 object-cover shadow-md"
            />
            <div className="flex items-center gap-2">
              <CardTitle className="text-center text-2xl font-bold">
                {patient.name}
              </CardTitle>
              <Badge className={badgeColor}>
                {getGeschlecht(patient.geschlecht)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="mt-2 space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold">Alter:</span>
              <span>{patient.alter}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Adresse:</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(patient.addresse)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline transition-colors"
              >
                {patient.addresse}
              </a>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Gewicht:</span>
              <span>{patient.gewicht} kg</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Notiz:</span>
              {isEditing ? (
                <>
                  <textarea
                    className="bg-background text-foreground min-h-[100px] w-full rounded-md border p-2"
                    value={notiz}
                    onChange={(e) => setNotiz(e.target.value)}
                    disabled={saving}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={saving}>
                      Speichern
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="secondary"
                      disabled={saving}
                    >
                      Abbrechen
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-muted-foreground block min-h-[100px] whitespace-pre-line">
                    {notiz || (
                      <span className="italic">Keine Notiz vorhanden.</span>
                    )}
                  </span>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="secondary"
                  >
                    Notiz bearbeiten
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
