import Link from "next/link";
import { WindowHeader, Window, WindowContent, Button } from "@/lib/react-95";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Window className="h-dvh w-full">
      <WindowHeader>
        Retro Pfleger App <span className="emoji">👩‍⚕️</span>
      </WindowHeader>
      <WindowContent className="flex h-full flex-col gap-4">
        <div>
          <Link href={"/patients"}>
            <Button>
              Deine Patienten <span className="emoji text-2xl">🧑‍🧑‍🧒</span>
            </Button>
          </Link>

          <Button>
            Deine Verfürbarkeiten <span className="emoji text-2xl">⏰</span>
          </Button>
          <Button>
            Ein Wagen Buchen <span className="emoji text-2xl">🚗</span>
          </Button>
        </div>
        {children}
      </WindowContent>
    </Window>
  );
}
