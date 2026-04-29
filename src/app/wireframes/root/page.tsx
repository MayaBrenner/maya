import type { Metadata } from "next";
import WireframeViewer from "./WireframeViewer";

export const metadata: Metadata = {
  title: "Root — Wireframes",
  robots: { index: false, follow: false },
};

export default function RootWireframePage() {
  return <WireframeViewer />;
}
