import Link from "next/link";
export default function EventNotFound() { return <main className="not-found page-shell"><p className="eyebrow">Event unavailable</p><h1>This event could not be found.</h1><Link className="button button--navy" href="/events">Return to events</Link></main>; }
