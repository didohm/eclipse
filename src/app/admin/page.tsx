import dynamic from "next/dynamic";
import { isAdmin } from "@/lib/auth";
import { getEvents, getLeaders } from "@/lib/content";

// The panel is a large client bundle (form state, editors, upload flow);
// it is only ever reached on /admin, so it never ships to public pages.
const AdminPanel = dynamic(() =>
  import("@/components/admin-panel").then((mod) => mod.AdminPanel),
);
export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export default async function AdminPage() { const authenticated = await isAdmin(); const [leaders, events] = authenticated ? await Promise.all([getLeaders(), getEvents()]) : [[], []]; return <main className="admin-page inner-page"><AdminPanel authenticated={authenticated} leaders={leaders} events={events} /></main>; }
