"use client";
import { useState } from "react";
import WagenPager from "./WagenPager";
import { Wagen } from "@/lib/types/types";
import { Button } from "@/components/ui/button";

export default function WagenPagerSwitcher({
  availableWagen,
  bookedWagen,
}: {
  availableWagen: Wagen[];
  bookedWagen: Wagen[];
}) {
  const [view, setView] = useState<"available" | "booked">("available");

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Button
          variant={view === "available" ? "default" : "secondary"}
          onClick={() => setView("available")}
        >
          Verfügbare Wagen
        </Button>
        <Button
          variant={view === "booked" ? "default" : "secondary"}
          onClick={() => setView("booked")}
        >
          Gebuchte Wagen
        </Button>
      </div>
      {view === "available" ? (
        <WagenPager wagen={availableWagen} />
      ) : (
        <WagenPager wagen={bookedWagen} />
      )}
    </div>
  );
}
