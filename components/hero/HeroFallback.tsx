import { Mark } from "../Logo";

// Static stand-in for the 3D scene: shown on first paint, on phones, on low-power
// devices and under reduced motion. Same composition as the WebGL scene: mark, hex
// frames, nodes. Each layer is its own element so motion stays on the GPU compositor.
const NODES: [number, number][] = [
  [62, 120], [118, 64], [210, 40], [318, 58], [402, 104], [448, 196], [462, 300], [430, 398],
  [360, 458], [262, 486], [160, 470], [84, 410], [44, 318], [38, 214], [140, 170], [380, 180],
  [396, 330], [118, 340], [250, 112], [300, 420],
];
const LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
  [11, 12], [12, 13], [13, 0], [0, 14], [14, 18], [18, 2], [3, 15], [15, 4], [6, 16], [16, 7],
  [11, 17], [17, 12], [9, 19], [19, 8], [14, 17], [15, 16],
];

export function HeroFallback() {
  return (
    <div aria-hidden className="absolute inset-0 flex items-center justify-center text-cyan">
      <div className="absolute aspect-[500/520] h-[94%] max-w-full motion-safe:animate-[breathe_7s_ease-in-out_infinite]">
        <svg viewBox="0 0 500 520" className="size-full">
          <g stroke="currentColor" strokeOpacity="0.2" strokeWidth="1">
            {LINKS.map(([a, b]) => (
              <line key={`${a}-${b}`} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
            ))}
          </g>
          <g fill="currentColor">
            {NODES.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3.2 : 2.2} fillOpacity={i % 4 === 0 ? 0.9 : 0.5} />
            ))}
          </g>
        </svg>
      </div>
      <svg
        viewBox="0 0 500 500"
        className="absolute aspect-square h-[78%] max-w-full motion-safe:animate-[spin_90s_linear_infinite]"
      >
        <path d="M250 95 384 172.5v155L250 405 116 327.5v-155z" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      </svg>
      <svg
        viewBox="0 0 500 500"
        className="absolute aspect-square h-[96%] max-w-full motion-safe:animate-[spin_140s_linear_infinite_reverse]"
      >
        <path d="M250 40 432 145v210L250 460 68 355V145z" fill="none" stroke="currentColor" strokeOpacity="0.13" />
      </svg>
      <Mark className="relative h-[38%] w-auto drop-shadow-[0_0_40px_rgba(3,212,238,0.35)] anim-float" />
    </div>
  );
}
