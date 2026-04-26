import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
}

const styles: Record<ButtonVariant, string> = {
  primary:
    "bg-[--color-ink] text-[--color-surface] hover:bg-[--color-accent-dark]",
  secondary:
    "border border-[--color-border] text-[--color-ink] hover:border-[--color-ink]",
  ghost:
    "text-[--color-muted] hover:text-[--color-ink]",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-[--duration-base] cursor-pointer";
  const cls = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
