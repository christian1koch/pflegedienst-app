"use client";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Wagen } from "@/lib/types/types";
import WagenGiphyGrid from "./WagenGiphyGrid";
import { Button } from "@/components/ui/button";
import { bookWagen } from "@/lib/db/db";

const WAGEN_PER_PAGE = 10;

export default function WagenPager({ wagen }: { wagen: Wagen[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(wagen.length / WAGEN_PER_PAGE);
  const start = (page - 1) * WAGEN_PER_PAGE;
  const end = start + WAGEN_PER_PAGE;
  const currentWagen = wagen.slice(start, end);

  const handleBookWagen = async (kennzeichen: string) => {
    console.log("Buchen", kennzeichen);
    await bookWagen(kennzeichen, 5);

    setPage(1);
  };

  return (
    <div>
      <h1>Wagen Übersicht</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {currentWagen.map((w) => (
          <div
            key={w.kennzeichen}
            style={{ border: "1px solid #ccc", padding: 16, width: 250 }}
          >
            <h2>{w.model}</h2>
            <WagenGiphyGrid model={w.model} />
            <p>Kennzeichen: {w.kennzeichen}</p>
            <p>Sitzplätze: {w.sitzplaetze}</p>
            <Button onClick={() => handleBookWagen(w.kennzeichen)}>
              Buchen
            </Button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                  href="#"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
