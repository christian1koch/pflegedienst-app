"use client";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Wagen } from "@/lib/types/types";
import WagenGiphyGrid from "./WagenGiphyGrid";
import { Button } from "@/components/ui/button";
import { bookWagen } from "@/lib/db/db";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

const WAGEN_PER_PAGE = 5;

function WagenTable({
  wagen,
  onBook,
}: {
  wagen: Wagen[];
  onBook: (kennzeichen: string) => void;
}) {
  return (
    <div className="mt-4 w-full overflow-x-auto rounded-md border">
      <Table>
        <TableCaption>Liste der verfügbaren Wagen</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Model</TableHead>
            <TableHead>Kennzeichen</TableHead>
            <TableHead>Sitzplätze</TableHead>
            <TableHead>Buchen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wagen.map((w) => (
            <TableRow key={w.kennzeichen}>
              <TableCell>
                <div className="flex flex-col items-center gap-2">
                  <span className="font-semibold">{w.model}</span>
                  <WagenGiphyGrid model={w.model} />
                </div>
              </TableCell>
              <TableCell>{w.kennzeichen}</TableCell>
              <TableCell>{w.sitzplaetze}</TableCell>
              <TableCell>
                <Button onClick={() => onBook(w.kennzeichen)}>Buchen</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function WagenPagination({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}) {
  return (
    <div style={{ marginTop: 32 }}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            />
          </PaginationItem>
          {/* Smart pagination logic */}
          {(() => {
            const items = [];
            const showLeftEllipsis = page > 4;
            const showRightEllipsis = page < totalPages - 3;
            items.push(
              <PaginationItem key={1}>
                <PaginationLink
                  isActive={page === 1}
                  onClick={() => setPage(1)}
                  href="#"
                >
                  1
                </PaginationLink>
              </PaginationItem>
            );
            if (showLeftEllipsis) {
              items.push(
                <PaginationItem key="left-ellipsis">
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            const start = Math.max(2, page - 3);
            const end = Math.min(totalPages - 1, page + 3);
            for (let i = start; i <= end; i++) {
              if (i === 1 || i === totalPages) continue;
              items.push(
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i}
                    onClick={() => setPage(i)}
                    href="#"
                  >
                    {i}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            if (showRightEllipsis) {
              items.push(
                <PaginationItem key="right-ellipsis">
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            if (totalPages > 1) {
              items.push(
                <PaginationItem key={totalPages}>
                  <PaginationLink
                    isActive={page === totalPages}
                    onClick={() => setPage(totalPages)}
                    href="#"
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            return items;
          })()}
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

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
      <WagenTable wagen={currentWagen} onBook={handleBookWagen} />
      <WagenPagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
