import type { Metadata } from "next";
import WireframeViewer from "./WireframeViewer";

export const metadata: Metadata = {
  title: "Chapter — The Relocation Marketplace",
  robots: { index: false, follow: false },
};

export default function ChapterWireframePage() {
  return <WireframeViewer />;
}
