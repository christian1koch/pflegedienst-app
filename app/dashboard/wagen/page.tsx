import { Wagen } from "@/lib/types/types";
import { getAvailableWagen } from "@/lib/db/db";
import WagenGiphyGrid from "./WagenGiphyGrid";
import Breadcrumbs from "../breadcrumbs";

export default async function WagenPage() {
  const wagen: Wagen[] = await getAvailableWagen();

  return (
    <div>
      <Breadcrumbs
        items={[{ title: "Dashboard", url: "/dashboard" }]}
        currentPage="Wagen"
      />
      <h1>Wagen Übersicht</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {wagen.map((w) => (
          <div
            key={w.kennzeichen}
            style={{ border: "1px solid #ccc", padding: 16, width: 250 }}
          >
            <h2>{w.model}</h2>
            <WagenGiphyGrid model={w.model} />
            <p>Kennzeichen: {w.kennzeichen}</p>
            <p>Sitzplätze: {w.sitzplaetze}</p>
            {/* Booking button will be implemented as a client component or via a form */}
            <form action="/api/wagen/book" method="POST">
              <input type="hidden" name="kennzeichen" value={w.kennzeichen} />
              <button type="submit">Buchen</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
