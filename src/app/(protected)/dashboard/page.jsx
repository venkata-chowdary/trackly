import { DataTable } from "@/components/data-table";
import data from "@/app/(protected)/data.json"
import { checkUser } from "@/lib/checkUser";

export default async function DashboardPage() {
  await checkUser()
  return <section>
    <DataTable data={data} />
  </section>
}