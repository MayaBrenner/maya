"use client";
import { usePathname } from "next/navigation";

export default function WireframeGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/wireframes")) return null;
  return <>{children}</>;
}
