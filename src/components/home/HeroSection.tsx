"use client";

/* Hero — BUILD treatment.
   Cream graph-paper canvas. Left headline, an iOS "Maya.OS" intro
   card in the centre with three hand-annotation stickers, right body
   + CTAs. The global cream pill Header floats above. */

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const POP = [0.34, 1.56, 0.64, 1] as const;

const FEEL_WORDS = [
  { word: "tactile", color: "var(--orange)" },
  { word: "alive", color: "var(--green)" },
  { word: "joyful", color: "var(--pink)" },
  { word: "specific", color: "var(--cobalt)" },
] as const;

function useTelAvivClock() {
  const [now, setNow] = useState("––:––");
  useEffect(() => {
    const tick = () => {
      try {
        const t = new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Jerusalem",
        });
        setNow(t);
      } catch {
        setNow("––:––");
      }
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function HeroSection() {
  const clock = useTelAvivClock();
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setWordIdx((i) => (i + 1) % FEEL_WORDS.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);
  const feel = FEEL_WORDS[wordIdx];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--cream)",
        backgroundImage:
          "linear-gradient(to right, rgba(26,23,20,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,23,20,0.06) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Signature color strip — tucked at top, sits under floating pill header */}
      <div
        aria-hidden
        style={{
          display: "flex",
          height: 14,
          width: "100%",
          borderBottom: "1.5px solid var(--ink)",
        }}
      >
        <span style={{ flex: 1, background: "var(--red)", borderRight: "1px solid var(--ink)" }} />
        <span style={{ flex: 1, background: "var(--yellow)", borderRight: "1px solid var(--ink)" }} />
        <span style={{ flex: 1, background: "var(--green)", borderRight: "1px solid var(--ink)" }} />
        <span style={{ flex: 1, background: "var(--cobalt)", borderRight: "1px solid var(--ink)" }} />
        <span style={{ flex: 1, background: "var(--pink)", borderRight: "1px solid var(--ink)" }} />
        <span style={{ flex: 1, background: "var(--orange)" }} />
      </div>

      {/* MAIN GRID — headline | phone | copy */}
      <div
        className="relative z-10 flex-1 grid place-items-center"
        style={{ padding: "150px clamp(20px, 4vw, 56px) 80px" }}
      >
        <style>{`
          @media (min-width: 1000px) {
            .build-grid { grid-template-columns: 1fr 360px 1fr !important; gap: clamp(28px, 4vw, 60px) !important; }
            .build-head { text-align: left !important; }
            .build-copy { text-align: left !important; align-items: flex-start !important; }
          }
        `}</style>
        <div
          className="build-grid grid items-center w-full"
          style={{
            gridTemplateColumns: "1fr",
            gap: 40,
            maxWidth: 1420,
          }}
        >
          {/* LEFT — headline */}
          <div className="build-head" style={{ textAlign: "center" }}>
            <h1
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "clamp(2.4rem, 5.2vw, 4.5rem)",
                lineHeight: 0.96,
                letterSpacing: "-0.045em",
                color: "var(--ink)",
                margin: 0,
              }}
            >
              {["A product designer", "making things", "that feel"].map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.14, ease: EASE }}
                  style={{ display: "block" }}
                >
                  {line}
                  {i === 2 && (
                    <>
                      {" "}
                      <span
                        style={{
                          position: "relative",
                          display: "inline-block",
                          verticalAlign: "baseline",
                          minWidth: "1ch",
                        }}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={feel.word}
                            initial={{ opacity: 0, y: 18, rotate: -2 }}
                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                            exit={{ opacity: 0, y: -18, rotate: 2 }}
                            transition={{ duration: 0.55, ease: EASE }}
                            style={{
                              display: "inline-block",
                              fontFamily: "var(--font-serif)",
                              fontStyle: "italic",
                              fontWeight: 500,
                              color: feel.color,
                            }}
                          >
                            {feel.word}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                      <span style={{ color: feel.color }}>.</span>
                    </>
                  )}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* CENTER — phone w/ Home Again screen + floating stickers */}
          <div
            className="relative flex justify-center"
            style={{ minHeight: 660 }}
          >
            {/* Sticker · 0 → 1 (top-left) */}
            <motion.div
              className="absolute"
              style={{
                top: -6,
                left: -46,
                zIndex: 20,
                transform: "rotate(-9deg)",
              }}
              initial={{ opacity: 0, scale: 0.65 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4, ease: POP }}
            >
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: "var(--yellow)",
                  border: "1.5px solid var(--ink)",
                  boxShadow: "3px 3px 0 var(--ink)",
                  padding: "7px 12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                TLV ↔ ANYWHERE
              </motion.div>
            </motion.div>

            {/* Sticker · status system (mid-right) */}
            <motion.div
              className="absolute"
              style={{
                top: 150,
                right: -36,
                zIndex: 20,
                transform: "rotate(6deg)",
              }}
              initial={{ opacity: 0, scale: 0.65 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.65, ease: POP }}
            >
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: "var(--paper)",
                  border: "1.5px solid var(--ink)",
                  boxShadow: "3px 3px 0 var(--ink)",
                  padding: "7px 12px",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 15,
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                hello there ✦
              </motion.div>
            </motion.div>

            {/* Sticker · warm, never pushy (bottom-left) */}
            <motion.div
              className="absolute"
              style={{
                bottom: 34,
                left: -52,
                zIndex: 20,
                transform: "rotate(-5deg)",
              }}
              initial={{ opacity: 0, scale: 0.65 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.85, ease: POP }}
            >
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: "var(--pink-soft)",
                  border: "1.5px solid var(--ink)",
                  boxShadow: "3px 3px 0 var(--ink)",
                  padding: "7px 12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "var(--ink)",
                  lineHeight: 1.25,
                }}
              >
                0 → 1
                <br />
                SPECIALIST
              </motion.div>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              style={{
                position: "relative",
                width: 310,
                background: "#0F0E0C",
                borderRadius: 46,
                padding: 7,
                boxShadow:
                  "0 50px 100px -24px rgba(0,0,0,0.42), 0 18px 50px -10px rgba(0,0,0,0.28)",
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 40,
                  background: "var(--cream)",
                  height: 640,
                  display: "flex",
                  flexDirection: "column",
                  padding: "42px 18px 22px",
                }}
              >
                {/* iOS status bar */}
                <div
                  className="mono"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  <span>9:41</span>
                  <span style={{ display: "inline-flex", gap: 4, fontSize: 9 }}>
                    <span>●●●</span>
                    <span>◐</span>
                    <span>▮</span>
                  </span>
                </div>

                {/* nav row */}
                <div
                  className="mono"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 8.5,
                    letterSpacing: "0.22em",
                    color: "var(--mute)",
                    borderBottom: "1px solid rgba(0,0,0,0.12)",
                    paddingBottom: 8,
                    marginTop: 16,
                  }}
                >
                  <span>ABOUT</span>
                  <span style={{ color: "var(--ink)", fontWeight: 700 }}>
                    MAYA.OS · v06.26
                  </span>
                  <span>＋</span>
                </div>

                {/* greeting */}
                <div style={{ marginTop: 22 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      fontSize: 36,
                      letterSpacing: "-0.045em",
                      lineHeight: 0.92,
                      color: "var(--ink)",
                    }}
                  >
                    Hi, I&rsquo;m
                    <br />
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontWeight: 500,
                      }}
                    >
                      Maya
                      <span style={{ color: "var(--red)" }}>.</span>
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "10px 0 0",
                      fontSize: 12.5,
                      lineHeight: 1.5,
                      color: "var(--ink-soft)",
                      fontWeight: 500,
                    }}
                  >
                    A{" "}
                    <em style={{ fontFamily: "var(--font-serif)", fontSize: 13.5 }}>
                      graphic designer
                    </em>
                    , stationery brand owner, and problem solver.
                  </p>
                </div>

                {/* stats */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                    marginTop: 16,
                  }}
                >
                  <div
                    style={{
                      border: "1.5px solid var(--ink)",
                      boxShadow: "3px 3px 0 var(--ink)",
                      background: "var(--paper)",
                      padding: "10px 11px",
                    }}
                  >
                    <div
                      className="mono"
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        color: "var(--mute)",
                      }}
                    >
                      YEARS
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 30,
                        lineHeight: 1,
                        color: "var(--ink)",
                        marginTop: 4,
                      }}
                    >
                      8+
                    </div>
                  </div>
                  <div
                    style={{
                      border: "1.5px solid var(--ink)",
                      boxShadow: "3px 3px 0 var(--ink)",
                      background: "var(--yellow)",
                      padding: "10px 11px",
                    }}
                  >
                    <div
                      className="mono"
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        color: "var(--mute)",
                      }}
                    >
                      SHIPPED
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 30,
                        lineHeight: 1,
                        color: "var(--ink)",
                        marginTop: 4,
                      }}
                    >
                      5
                    </div>
                  </div>
                </div>

                {/* now list */}
                <div
                  className="mono"
                  style={{
                    marginTop: 18,
                    fontSize: 8.5,
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    color: "var(--mute)",
                  }}
                >
                  NOW · 06.2026
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "8px 0 0",
                    fontSize: 12,
                    lineHeight: 1.45,
                    color: "var(--ink)",
                    fontWeight: 500,
                  }}
                >
                  <li style={{ display: "flex", gap: 8, marginBottom: 5, alignItems: "baseline" }}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: "var(--green)",
                        flex: "0 0 auto",
                        transform: "translateY(2px)",
                      }}
                    />
                    Open to UX / UI jobs
                  </li>
                  <li style={{ display: "flex", gap: 8, marginBottom: 5, alignItems: "baseline" }}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: "var(--cobalt)",
                        flex: "0 0 auto",
                        transform: "translateY(2px)",
                      }}
                    />
                    Building soft systems
                  </li>
                  <li style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: "var(--pink)",
                        flex: "0 0 auto",
                        transform: "translateY(2px)",
                      }}
                    />
                    Love the print world
                  </li>
                </ul>

                {/* tab bar */}
                <div
                  className="mono"
                  style={{
                    marginTop: "auto",
                    paddingTop: 12,
                    borderTop: "1px solid rgba(0,0,0,0.12)",
                    display: "flex",
                    justifyContent: "space-around",
                    fontSize: 8.5,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    color: "var(--mute)",
                  }}
                >
                  <span style={{ color: "var(--ink)" }}>HOME</span>
                  <span>WORK</span>
                  <span>ABOUT</span>
                  <span>SAY HI</span>
                </div>

                {/* Home indicator */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 118,
                    height: 5,
                    borderRadius: 999,
                    background: "rgba(0,0,0,0.22)",
                    zIndex: 5,
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — body + CTAs */}
          <motion.div
            className="build-copy flex flex-col"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
            style={{
              gap: 20,
              maxWidth: 340,
              textAlign: "center",
              alignItems: "center",
              justifySelf: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16.5,
                lineHeight: 1.55,
                fontWeight: 500,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              Tel Aviv based. I work across{" "}
              <em
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 18,
                }}
              >
                screens and paper
              </em>{" "}
              — shipping UX/UI for apps, shaping brand systems, and running a
              small stationery studio on the side.
            </p>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link
                href="#work"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  height: 50,
                  padding: "0 22px",
                  background: "var(--ink)",
                  color: "var(--cream)",
                  borderRadius: 999,
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  letterSpacing: "-0.005em",
                }}
              >
                See the work
                <span aria-hidden style={{ fontSize: 13 }}>→</span>
              </Link>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: 50,
                  padding: "0 22px",
                  border: "1.5px solid var(--ink)",
                  borderRadius: 999,
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  color: "var(--ink)",
                  background: "var(--paper)",
                }}
              >
                Say hello
              </Link>
            </div>

            <div
              className="mono"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "var(--ink-soft)",
                marginTop: 2,
              }}
            >
              <motion.span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: "var(--green)",
                  display: "inline-block",
                }}
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              OPEN TO WORK · TLV · {clock}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
