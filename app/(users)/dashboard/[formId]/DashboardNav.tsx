"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardNav({ formId }: { formId: string }) {
  const pathname = usePathname();
  const baseUrl = `/dashboard/${formId}`;
  
  const tabs = [
    { name: "Overview", href: baseUrl },
    { name: "Responses", href: `${baseUrl}/response` },
    { name: "Settings", href: `${baseUrl}/settings` },
  ];

  return (
    <nav className="flex space-x-6">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary pb-2 border-b-2 -mb-px",
              isActive
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground"
            )}
          >
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
}
