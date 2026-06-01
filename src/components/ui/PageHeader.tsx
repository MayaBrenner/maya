"use client";

import { motion } from "framer-motion";
import { Star10 } from "@/components/ui/Shapes";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

const EASE_BACK = [0.34, 1.56, 0.64, 1] as const;

export default function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--cream)",
        paddingTop: 120,
        paddingBottom: 80,
        borderBottom: "3px solid var(--ink)",
      }}
    >
      <div className="absolute top-16 right-12 spin-slow pointer-events-none hidden md:block">
        <Star10 size={80} fill="var(--red)" />
      </div>
      <div className="container relative">
        <motion.span
          className="sticker"
          style={{ background: "var(--yellow)" }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--red)" }} />
          {label.toUpperCase()}
        </motion.span>

        <motion.h1
          className="mt-8 leading-[0.88]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 10vw, 10rem)",
            letterSpacing: "-0.025em",
            color: "var(--ink)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE_BACK, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            className="mt-8 max-w-[44ch]"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.4rem, 2.3vw, 1.9rem)",
              lineHeight: 1.2,
              color: "var(--ink)",
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
