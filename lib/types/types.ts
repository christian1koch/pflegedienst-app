export interface Patient {
  id: number;
  name: string;
  alter: number;
  gewicht: number;
  addresse: string;
  geschlecht: "m" | "f" | "d";
  pflegekraft_id: number;
  notiz: string;
}

export interface Pflegekraft {
  id: number;
  name: string;
}

export interface Medikament {
  id: number;
  name: string;
}

export interface PatientenMedikament {
  patienten_id: number;
  id: number;
  name: string;
  dosis: string;
  einnahmezeit: Date; // DATE as string
}
export interface Wagen {
  kennzeichen: string;
  model: string;
  sitzplaetze: number;
}
