import type { Metadata } from "next";
import WireframeViewer from "./WireframeViewer";

export const metadata: Metadata = {
  title: "Mayul Studio — Brand Identity",
  robots: { index: false, follow: false },
};

export default function MayulStudioWireframePage() {
  return <WireframeViewer />;
}
