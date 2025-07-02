import { getVerfuerbarkeitenByPflegekraft } from "@/lib/db/db";
import { PflegekraftVerfuerbarkeiten } from "@/lib/types/types";
import Breadcrumbs from "../breadcrumbs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { PFLEGEKRAFT_ID } from "@/lib/types/constants";

function getCurrentWeekday(): string {
  const days = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  return days[new Date().getDay()];
}

function isNowInWork(verf: PflegekraftVerfuerbarkeiten[]): boolean {
  const now = new Date();
  const weekday = getCurrentWeekday();
  const today = verf.filter((v) => v.wochentag === weekday);
  if (today.length === 0) return false;
  const nowStr = now.toTimeString().slice(0, 5); // 'HH:MM'
  return today.some((v) => v.startzeit <= nowStr && nowStr <= v.endzeit);
}

export default async function VerfuerbarkeitenPage() {
  const pflegekraftId = PFLEGEKRAFT_ID;
  const verfuerbarkeiten =
    await getVerfuerbarkeitenByPflegekraft(pflegekraftId);
  const inWork = isNowInWork(verfuerbarkeiten);

  return (
    <div className="mx-auto mt-8 w-full">
      <Breadcrumbs
        items={[{ title: "Dashboard", url: "/dashboard" }]}
        currentPage="Verfügbarkeiten"
        className="self-start"
      />
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-center text-3xl font-bold">Verfügbarkeiten</h1>
        <div className="mb-4 text-center">
          {inWork ? (
            <span className="font-semibold text-green-600">
              Du bist aktuell im Dienst.
            </span>
          ) : (
            <span className="font-semibold text-red-600">
              Du bist aktuell nicht im Dienst.
            </span>
          )}
        </div>
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableCaption>Deine Verfügbarkeiten</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Wochentag</TableHead>
                <TableHead>Startzeit</TableHead>
                <TableHead>Endzeit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {verfuerbarkeiten.map((v, i) => (
                <TableRow key={i}>
                  <TableCell>{v.wochentag}</TableCell>
                  <TableCell>{v.startzeit}</TableCell>
                  <TableCell>{v.endzeit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
