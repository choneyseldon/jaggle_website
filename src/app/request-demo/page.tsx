import type { Metadata } from "next";
import { RequestDemoClient } from "./RequestDemoClient";
import "./request-demo.css";

export const metadata: Metadata = {
  title: "Jaggle AI — Request a Demo",
};

export default function RequestDemoPage() {
  return <RequestDemoClient />;
}
