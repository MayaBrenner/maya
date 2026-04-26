"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="section container">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label block mb-6">Product Designer · Tel Aviv</span>
          <h1
            className="mb-8 leading-[1.05]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Designing experiences that feel as considered as something{" "}
            <em className="not-italic text-[--color-accent]">you'd hold in your hands.</em>
          </h1>
        </motion.div>

        <motion.p
          className="mb-10 max-w-2xl text-lg text-[--color-muted]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          I bring the craft precision of print design to digital product — building apps,
          systems, and experiences where every detail is intentional.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Button href="/work">View my work</Button>
          <Button href="/about" variant="secondary">About me</Button>
        </motion.div>
      </div>
    </section>
  );
}
