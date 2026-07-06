import Link from "next/link";
import type { ReactNode } from "react";

type LiquidButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
};

export function LiquidButton({ href, children, variant = "ghost", size = "md", className = "", external = false }: LiquidButtonProps) {
  const sizeClass = size === "sm" ? "lg-btn--sm" : size === "lg" ? "lg-btn--lg" : "";
  const variantClass = variant === "primary" ? "lg-btn--primary" : "";
  const classes = ["lg-btn", variantClass, sizeClass, className].filter(Boolean).join(" ");

  const inner = (
    <>
      <span className="lg-refract" aria-hidden="true" />
      <span className="lg-edge" aria-hidden="true" />
      <span className="lg-label">{children}</span>
    </>
  );

  const isHash = href.startsWith("#");
  if (external || isHash) {
    return (
      <a className={classes} href={href}>
        {inner}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {inner}
    </Link>
  );
}
