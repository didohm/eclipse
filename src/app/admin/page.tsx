import { AdminPanel } from "@/components/admin-panel";
import { isAdmin } from "@/lib/auth";
import { getEvents, getLeaders } from "@/lib/content";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export default async function AdminPage() { const authenticated = await isAdmin(); const [leaders, events] = authenticated ? await Promise.all([getLeaders(), getEvents()]) : [[], []]; return <main className="admin-page inner-page"><AdminPanel authenticated={authenticated} leaders={leaders} events={events} /></main>; }
