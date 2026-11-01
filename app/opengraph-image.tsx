import { renderOg, ogSize } from "@/lib/og";

export const alt = "Sastech Consults: websites that get found, systems that do the work";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    kicker: "AI systems and websites, Lagos",
    title: "Websites that get found. Systems that do the work.",
  });
}
