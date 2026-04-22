import Link from "next/link";

const items = [
  { href: "/", label: "Dashboard" },
  { href: "/agents", label: "Agents" },
  { href: "/tasks", label: "Tasks" },
  { href: "/monitor", label: "Monitor" },
];

export function Nav() {
  return (
    <nav className="flex flex-wrap gap-3 text-sm text-slate-300">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="rounded-full border border-slate-800 px-4 py-2 hover:border-accent">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
