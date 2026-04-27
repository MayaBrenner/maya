"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="container pt-16 pb-10 lg:pt-20 lg:pb-14">
      <motion.div
        style={{
          height: 1,
          background: "var(--color-accent)",
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mb-6"
      />
      <motion.span
        className="label block mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
      >
        {label}
      </motion.span>
      <motion.h1
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          className="mt-5 max-w-xl text-lg text-[--color-muted]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
