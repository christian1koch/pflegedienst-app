import Breadcrumbs from "./breadcrumbs";
import { getPflegekraftById } from "@/lib/db/db";
import { PFLEGEKRAFT_ID } from "@/lib/types/constants";
import { TypographyH1 } from "@/components/ui/typography";

export default async function Dashboard() {
  const pflegekraft = await getPflegekraftById(PFLEGEKRAFT_ID.toString());
  return (
    <div>
      <Breadcrumbs items={[]} currentPage="Dashboard" />
      <TypographyH1>
        Willkommen {pflegekraft?.name ?? "-"} (Pflegekraft {PFLEGEKRAFT_ID})
      </TypographyH1>
    </div>
  );
}
