import type { Metadata } from "next";
import WireframeViewer from "./WireframeViewer";

export const metadata: Metadata = {
  title: "Scout — Wireframes",
  robots: { index: false, follow: false },
};

export default function ScoutWireframePage() {
  return <WireframeViewer />;
}
