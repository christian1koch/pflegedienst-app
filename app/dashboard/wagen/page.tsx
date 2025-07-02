import { Wagen } from "@/lib/types/types";
import { getAvailableWagen, getBookedWagen } from "@/lib/db/db";
import WagenPager from "./WagenPager";

export default async function WagenPage() {
  const pflegekraftId = 5;
  const availableWagen: Wagen[] = await getAvailableWagen();
  const bookedWagen: Wagen[] = await getBookedWagen(pflegekraftId);
  return (
    <div>
      <h1>Wagen Übersicht</h1>
      <h2>Verfügbare Wagen</h2>
      <WagenPager wagen={availableWagen} />
      <h2 style={{ marginTop: 40 }}>Gebuchte Wagen</h2>
      <WagenPager wagen={bookedWagen} />
    </div>
  );
}
