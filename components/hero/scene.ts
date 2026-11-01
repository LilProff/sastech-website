// Hero 3D scene: the Sastech hexagon S mark as an extruded glass-and-line object,
// inside a field of connected nodes with data pulses travelling between them.
// Vanilla three.js (no React renderer) to keep the lazy chunk small. Loaded only after
// first paint, never under reduced motion or on low-power devices (see HeroCanvas).

import {
  AdditiveBlending,
  NormalBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  EdgesGeometry,
  ExtrudeGeometry,
  Group,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  PointLight,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { MARK_OUTER, MARK_S_BOTTOM, MARK_S_TOP } from "@/lib/mark";

const CYAN = new Color("#03D4EE");
const CYAN_DEEP = new Color("#01B7CC");

export type SceneHandle = { dispose: () => void };

export function createHeroScene(
  container: HTMLElement,
  opts: { lite: boolean; light?: boolean; onSlow?: () => void },
): SceneHandle {
  const renderer = new WebGLRenderer({
    antialias: window.devicePixelRatio < 1.5,
    alpha: true,
    powerPreference: "high-performance",
  });

  // Software rendering (no GPU) would block the main thread every frame: bail out.
  const gl = renderer.getContext();
  const dbg = gl.getExtension("WEBGL_debug_renderer_info");
  const gpu = `${dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : ""} ${gl.getParameter(gl.RENDERER)}`;
  if (/swiftshader|llvmpipe|software|basic render/i.test(gpu)) {
    renderer.dispose();
    throw new Error(`software renderer: ${gpu}`);
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  container.appendChild(renderer.domElement);

  // Light theme: additive glow vanishes on white, so use normal blending and a deeper cyan.
  const accent = opts.light ? new Color("#0a8fa8") : CYAN;
  const blend = opts.light ? NormalBlending : AdditiveBlending;
  const lineAlpha = opts.light ? 0.3 : 0.16;

  const scene = new Scene();
  const camera = new PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0, 9.5);

  const pmrem = new PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;

  const key = new DirectionalLight(0xffffff, 1.4);
  key.position.set(3, 4, 6);
  scene.add(key);
  const glow = new PointLight(CYAN, 18, 12, 1.6);
  glow.position.set(0, 0, 3);
  scene.add(glow);

  const world = new Group();
  scene.add(world);

  // ---------- The mark ----------
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${MARK_OUTER}"/><path d="${MARK_S_TOP}"/><path d="${MARK_S_BOTTOM}"/></svg>`;
  const data = new SVGLoader().parse(svg);
  // Path space is already y-up (the logo SVG flips it with scale(0.1,-0.1)), so no flip here.
  const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
  const markGeo = new ExtrudeGeometry(shapes, {
    depth: 260,
    bevelEnabled: true,
    bevelThickness: 40,
    bevelSize: 22,
    bevelSegments: 2,
    curveSegments: opts.lite ? 3 : 5,
  });
  markGeo.computeBoundingBox();
  const bb = markGeo.boundingBox!;
  const center = new Vector3();
  bb.getCenter(center);
  markGeo.translate(-center.x, -center.y, -center.z);
  const markScale = 2.9 / (bb.max.y - bb.min.y);
  markGeo.scale(markScale, markScale, markScale);

  const markMat = new MeshPhysicalMaterial({
    color: CYAN_DEEP,
    metalness: 0.55,
    roughness: 0.16,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    emissive: CYAN_DEEP,
    emissiveIntensity: 0.12,
    envMapIntensity: 1.35,
    transparent: true,
    opacity: 0.92,
  });
  const mark = new Mesh(markGeo, markMat);

  const edges = new LineSegments(
    new EdgesGeometry(markGeo, 28),
    new LineBasicMaterial({ color: accent, transparent: true, opacity: 0.55, blending: blend }),
  );
  const markGroup = new Group();
  markGroup.add(mark, edges);
  world.add(markGroup);

  // Hexagon frames orbiting the mark.
  const hexRings: LineLoop[] = [];
  [2.25, 2.85].forEach((r, i) => {
    const pts: number[] = [];
    for (let k = 0; k < 6; k++) {
      const a = (Math.PI / 3) * k + Math.PI / 6;
      pts.push(Math.cos(a) * r, Math.sin(a) * r, 0);
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(new Float32Array(pts), 3));
    const ring = new LineLoop(
      g,
      new LineBasicMaterial({ color: accent, transparent: true, opacity: i === 0 ? 0.32 : 0.16 }),
    );
    ring.position.z = i === 0 ? -0.4 : -0.9;
    hexRings.push(ring);
    world.add(ring);
  });

  // ---------- Node field ----------
  const N = opts.lite ? 54 : 96;
  const nodes: Vector3[] = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  while (nodes.length < N) {
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const r = 2.4 + rand() * 2.4;
    const v = new Vector3(
      r * Math.sin(phi) * Math.cos(theta) * 1.35,
      r * Math.sin(phi) * Math.sin(theta) * 0.95,
      r * Math.cos(phi) * 0.7 - 0.6,
    );
    nodes.push(v);
  }

  // Connect each node to its nearest neighbours.
  const edgeList: [number, number][] = [];
  const adjacency: number[][] = nodes.map(() => []);
  const seen = new Set<string>();
  nodes.forEach((a, i) => {
    const near = nodes
      .map((b, j) => ({ j, d: a.distanceToSquared(b) }))
      .filter((x) => x.j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, 3);
    for (const { j, d } of near) {
      if (d > 3.2) continue;
      const k = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(k)) continue;
      seen.add(k);
      adjacency[i].push(edgeList.length);
      adjacency[j].push(edgeList.length);
      edgeList.push([i, j]);
    }
  });

  const linePos = new Float32Array(edgeList.length * 6);
  edgeList.forEach(([i, j], e) => {
    nodes[i].toArray(linePos, e * 6);
    nodes[j].toArray(linePos, e * 6 + 3);
  });
  const linesGeo = new BufferGeometry();
  linesGeo.setAttribute("position", new BufferAttribute(linePos, 3));
  const lines = new LineSegments(
    linesGeo,
    new LineBasicMaterial({ color: accent, transparent: true, opacity: lineAlpha, blending: blend }),
  );
  world.add(lines);

  const pointMat = (base: number) =>
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: blend,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: accent },
        uScale: { value: base * renderer.getPixelRatio() },
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute float aPhase;
        uniform float uTime;
        uniform float uScale;
        varying float vAlpha;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float tw = 0.65 + 0.35 * sin(uTime * 1.6 + aPhase);
          vAlpha = tw;
          gl_PointSize = aSize * uScale * tw / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(uColor, a * a * vAlpha);
        }`,
    });

  const nodePos = new Float32Array(N * 3);
  const nodeSize = new Float32Array(N);
  const nodePhase = new Float32Array(N);
  nodes.forEach((v, i) => {
    v.toArray(nodePos, i * 3);
    nodeSize[i] = 3 + rand() * 6;
    nodePhase[i] = rand() * Math.PI * 2;
  });
  const nodesGeo = new BufferGeometry();
  nodesGeo.setAttribute("position", new BufferAttribute(nodePos, 3));
  nodesGeo.setAttribute("aSize", new BufferAttribute(nodeSize, 1));
  nodesGeo.setAttribute("aPhase", new BufferAttribute(nodePhase, 1));
  const nodeMaterial = pointMat(14);
  world.add(new Points(nodesGeo, nodeMaterial));

  // ---------- Data pulses travelling along edges ----------
  const P = opts.lite ? 14 : 28;
  const pulses = Array.from({ length: P }, () => {
    const e = Math.floor(rand() * edgeList.length);
    return { e, from: edgeList[e][0], t: rand(), speed: 0.25 + rand() * 0.45 };
  });
  const pulsePos = new Float32Array(P * 3);
  const pulseSize = new Float32Array(P).fill(9);
  const pulsePhase = new Float32Array(P).map(() => rand() * 6);
  const pulseGeo = new BufferGeometry();
  pulseGeo.setAttribute("position", new BufferAttribute(pulsePos, 3));
  pulseGeo.setAttribute("aSize", new BufferAttribute(pulseSize, 1));
  pulseGeo.setAttribute("aPhase", new BufferAttribute(pulsePhase, 1));
  const pulseMaterial = pointMat(20);
  world.add(new Points(pulseGeo, pulseMaterial));

  const tmp = new Vector3();
  function stepPulses(dt: number) {
    if (!edgeList.length) return;
    pulses.forEach((p, i) => {
      p.t += dt * p.speed;
      if (p.t >= 1) {
        // Hop to a neighbouring edge so data appears to flow through the network.
        const [a, b] = edgeList[p.e];
        const at = p.from === a ? b : a;
        const options = adjacency[at].filter((x) => x !== p.e);
        p.e = options.length ? options[Math.floor(rand() * options.length)] : p.e;
        p.from = at;
        p.t = 0;
      }
      const [a, b] = edgeList[p.e];
      const start = nodes[p.from];
      const end = nodes[p.from === a ? b : a];
      tmp.copy(start).lerp(end, p.t).toArray(pulsePos, i * 3);
    });
    pulseGeo.attributes.position.needsUpdate = true;
  }

  // ---------- Interaction ----------
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Pull the camera back on narrow screens so the whole mark fits.
    camera.position.z = w / h < 0.9 ? 12.5 : 9.5;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  // ---------- Loop (paused when off-screen or tab hidden) ----------
  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    toggle();
  });
  io.observe(container);
  const onVis = () => toggle();
  document.addEventListener("visibilitychange", onVis);

  let last = performance.now();
  let elapsed = 0;
  // Frame budget guard: after a warm-up (shader compile), sample 90 frames. If the
  // median frame is slower than 20fps, give up and let the static hero take over.
  // Frames from hidden tabs or long pauses are ignored so they can't trip it.
  let warmup = 30;
  const samples: number[] = [];
  let guardDone = !opts.onSlow;
  function frame(now: number) {
    const raw = (now - last) / 1000;
    const dt = Math.min(raw, 0.05);
    last = now;
    elapsed += dt;
    if (!guardDone && document.visibilityState === "visible" && raw < 0.5) {
      if (warmup > 0) warmup--;
      else samples.push(raw);
      if (samples.length === 90) {
        guardDone = true;
        const median = samples.sort((a, b) => a - b)[45];
        if (median > 1 / 20) {
          renderer.setAnimationLoop(null);
          opts.onSlow?.();
          return;
        }
      }
    }

    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    const scroll = Math.min(window.scrollY / Math.max(container.clientHeight, 1), 1.2);

    markGroup.rotation.y = Math.sin(elapsed * 0.35) * 0.55 + pointer.x * 0.45;
    markGroup.rotation.x = Math.sin(elapsed * 0.27) * 0.12 - pointer.y * 0.25 + scroll * 0.35;
    markGroup.position.y = Math.sin(elapsed * 0.6) * 0.06;

    world.rotation.y = elapsed * 0.04 + pointer.x * 0.12;
    world.rotation.x = -pointer.y * 0.08;
    hexRings[0].rotation.z = elapsed * 0.08;
    hexRings[1].rotation.z = -elapsed * 0.05;

    glow.position.set(pointer.x * 3.5, pointer.y * 2.5, 3);
    camera.position.y = -scroll * 0.6;
    camera.lookAt(0, -scroll * 0.3, 0);

    nodeMaterial.uniforms.uTime.value = elapsed;
    pulseMaterial.uniforms.uTime.value = elapsed;
    stepPulses(dt);

    renderer.render(scene, camera);
  }

  function toggle() {
    const run = visible && document.visibilityState === "visible";
    if (run) {
      last = performance.now();
      renderer.setAnimationLoop(frame);
    } else {
      renderer.setAnimationLoop(null);
    }
  }
  toggle();

  return {
    dispose() {
      renderer.setAnimationLoop(null);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      scene.traverse((obj) => {
        const o = obj as Mesh;
        o.geometry?.dispose();
        const m = o.material as { dispose?: () => void } | undefined;
        m?.dispose?.();
      });
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
