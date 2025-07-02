import { Wagen } from "@/lib/types/types";
import { getAvailableWagen } from "@/lib/db/db";
import WagenPager from "./WagenPager";

export default async function WagenPage() {
  const wagen: Wagen[] = await getAvailableWagen();
  return <WagenPager wagen={wagen} />;
}
