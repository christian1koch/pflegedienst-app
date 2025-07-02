import { getVerfuerbarkeitenByPflegekraft } from "@/lib/db/db";
import { PflegekraftVerfuerbarkeiten } from "@/lib/types/types";

function getCurrentWeekday(): string {
  // JS: 0=Sunday, 1=Monday, ... 6=Saturday; DB: Montag, Dienstag, ...
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
  const pflegekraftId = 5;
  const verfuerbarkeiten =
    await getVerfuerbarkeitenByPflegekraft(pflegekraftId);
  const inWork = isNowInWork(verfuerbarkeiten);

  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <h1 className="mb-4 text-center text-3xl font-bold">Verfügbarkeiten</h1>
      <div className="mb-4 text-center">
        {inWork ? (
          <span className="font-semibold text-green-600">
            Pflegekraft 5 ist aktuell im Dienst.
          </span>
        ) : (
          <span className="font-semibold text-red-600">
            Pflegekraft 5 ist aktuell nicht im Dienst.
          </span>
        )}
      </div>
      <table className="w-full rounded-md border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Wochentag</th>
            <th className="border p-2">Startzeit</th>
            <th className="border p-2">Endzeit</th>
          </tr>
        </thead>
        <tbody>
          {verfuerbarkeiten.map((v, i) => (
            <tr key={i}>
              <td className="border p-2">{v.wochentag}</td>
              <td className="border p-2">{v.startzeit}</td>
              <td className="border p-2">{v.endzeit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
