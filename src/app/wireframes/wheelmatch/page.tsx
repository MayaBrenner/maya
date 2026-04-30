import type { Metadata } from "next";
import WireframeViewer from "./WireframeViewer";

export const metadata: Metadata = {
  title: "WheelMatch — Wireframes",
  robots: { index: false, follow: false },
};

export default function WheelMatchWireframePage() {
  return <WireframeViewer />;
}
