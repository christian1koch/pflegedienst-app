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
