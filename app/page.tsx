"use client";
import { Button, Window, WindowContent, WindowHeader } from "react95";

export default function Home() {
  return (
    <Window className="h-dvh w-full">
      <WindowHeader>
        Retro Pfleger App <span className="emoji">👩‍⚕️</span>
      </WindowHeader>
      <WindowContent>
        <Button>Click me</Button>
      </WindowContent>
    </Window>
  );
}
