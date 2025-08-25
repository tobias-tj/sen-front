import { SidebarLayout } from "@/SidebarLayout";
import Dashboard from "./Dashboard";

export default function Home({
  setToken,
}: {
  setToken: (t: string | null) => void;
}) {
  return (
    <SidebarLayout setToken={setToken}>
      <Dashboard></Dashboard>
    </SidebarLayout>
  );
}
