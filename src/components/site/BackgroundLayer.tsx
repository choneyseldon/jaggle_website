import { DottedBackground } from "./DottedBackground";

export function BackgroundLayer() {
  return (
    <>
      <div className="bg-scrim" />
      <div className="bg-grain" />
      <DottedBackground />
    </>
  );
}
