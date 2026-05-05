import type { Metadata } from "next";
import WireframeViewer from "./WireframeViewer";

export const metadata: Metadata = {
  title: "CarDB — AI Car Buying Advisor",
  robots: { index: false, follow: false },
};

export default function CarDBWireframePage() {
  return <WireframeViewer />;
}
