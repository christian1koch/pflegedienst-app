"use client";
import { updatePatientNotiz } from "@/lib/db/db";
import { Button, Frame, TextInput, WindowHeader } from "@/lib/react-95";
import { Patient } from "@/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PatientInfo({ patient }: { patient: Patient }) {
  const [notiz, setNotiz] = useState(patient.notiz);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    setIsEditing(false);
    await updatePatientNotiz(patient.id, notiz);
    setNotiz(notiz);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNotiz(patient.notiz);
  };

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
            <p>
              Addresse:{" "}
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${patient.addresse}`}
                target="_blank"
                className="text-anchor"
              >
                {patient.addresse}
              </Link>
            </p>
            <p>Geschlecht: {patient.geschlecht}</p>
            <div className="flex flex-col">
              <WindowHeader className="!bg-yellow-500">
                Patienten Notiz <span className="emoji">📝</span>
              </WindowHeader>
              <TextInput
                variant="flat"
                value={notiz}
                onChange={(e) => setNotiz(e.target.value)}
                multiline
                rows={5}
                disabled={!isEditing}
              />
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="w-full">
                    Notiz speichern <span className="emoji">💾</span>
                  </Button>
                  <Button onClick={handleCancel} className="w-full">
                    Abbrechen
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="w-full">
                  Notiz bearbeiten <span className="emoji">✏️</span>
                </Button>
              )}
            </div>
          </div>
        </Frame>
      </div>
      <PatientPicture patient={patient} />
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

const PatientPicture = ({ patient }: { patient: Patient }) => {
  return (
    <Frame shadow>
      {patient.geschlecht === "f" ? (
        <Image alt="old person" src="/old-woman.jpg" width={400} height={600} />
      ) : (
        <Image alt="old person" src="/old-man.jpg" width={400} height={600} />
      )}
    </Frame>
  );
};
