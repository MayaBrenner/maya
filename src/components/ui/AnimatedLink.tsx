"use client";

import Link from "next/link";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export default function AnimatedLink({
  href,
  children,
  className = "",
  external = false,
}: AnimatedLinkProps) {
  return (
    <Link
      href={href}
      className={`relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
