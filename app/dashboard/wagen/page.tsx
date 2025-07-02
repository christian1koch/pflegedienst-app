import { Wagen } from "@/lib/types/types";
import { getAvailableWagen, getBookedWagen } from "@/lib/db/db";
import WagenPagerSwitcher from "./WagenPagerSwitcher";
import Breadcrumbs from "../breadcrumbs";
import { PFLEGEKRAFT_ID } from "@/lib/types/constants";

export default async function WagenPage() {
  const pflegekraftId = PFLEGEKRAFT_ID;
  const availableWagen: Wagen[] = await getAvailableWagen();
  const bookedWagen: Wagen[] = await getBookedWagen(pflegekraftId);
  return (
    <div className="flex w-full flex-col gap-4">
      <Breadcrumbs
        items={[{ title: "Dashboard", url: "/dashboard" }]}
        currentPage="Wagen"
      />
      <div className="flex w-full flex-row justify-center gap-4">
        <WagenPagerSwitcher
          availableWagen={availableWagen}
          bookedWagen={bookedWagen}
        />
      </div>
    </div>
  );
}
