import { Wagen } from "@/lib/types/types";
import { getAvailableWagen, getBookedWagen } from "@/lib/db/db";
import WagenPagerSwitcher from "./WagenPagerSwitcher";

export default async function WagenPage() {
  const pflegekraftId = 5;
  const availableWagen: Wagen[] = await getAvailableWagen();
  const bookedWagen: Wagen[] = await getBookedWagen(pflegekraftId);
  return (
    <div className="flex flex-row gap-4">
      <WagenPagerSwitcher
        availableWagen={availableWagen}
        bookedWagen={bookedWagen}
      />
    </div>
  );
}
