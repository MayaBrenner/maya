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

const variantStyle: Record<ButtonVariant, React.CSSProperties> = {
  primary:   { background: "var(--red)",   color: "var(--cream)" },
  secondary: { background: "var(--cream)", color: "var(--ink)" },
  ghost:     { background: "transparent",  color: "var(--ink)", border: "2.5px dashed var(--ink)", boxShadow: "none" },
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const cls = `btn-sticker ${className}`;
  const style = variantStyle[variant];

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        style={style}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        <span style={{ color: variant === "primary" ? "var(--yellow)" : "var(--red)" }}>→</span>
      </Link>
    );
  }
  return (
    <button className={cls} style={style} onClick={onClick}>
      {children}
      <span style={{ color: variant === "primary" ? "var(--yellow)" : "var(--red)" }}>→</span>
    </button>
  );
}
