import { getPflegekraftById } from "@/lib/db/db";

export default async function Home() {
  const Pflegekraft = await getPflegekraftById("5");
  return <div>{`Wilkommen zurück ${Pflegekraft.name}`}</div>;
}
