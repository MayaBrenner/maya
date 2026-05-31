import type { Metadata } from "next";
import WireframeViewer from "./WireframeViewer";

export const metadata: Metadata = {
  title: "I DO — Wedding Planning OS",
  robots: { index: false, follow: false },
};

export default function IDoWireframePage() {
  return <WireframeViewer />;
}
