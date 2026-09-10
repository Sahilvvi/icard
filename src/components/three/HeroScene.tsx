"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { makeCardTexture, PALETTES } from "./cardTexture";
import { gsap } from "@/lib/motion";

const CARD_W = 2.14;
const CARD_H = 3.375;
const CARD_D = 0.03;

type CardCfg = {
  palette: keyof typeof PALETTES;
  chip?: boolean;
  pos: [number, number, number];
  rot: [number, number, number];
  from: [number, number, number];
  drift: number; // how far it moves (forward/back) on scroll
  holder?: boolean;
  lanyard?: boolean;
};

const CARDS: CardCfg[] = [
  { palette: "purple", chip: true, pos: [0.15, 0.1, 0.6], rot: [-0.04, -0.22, 0.06], from: [0, -6, 4], drift: 1.6, lanyard: true },
  { palette: "charcoal", pos: [-1.7, 0.7, -0.5], rot: [0.05, 0.32, -0.12], from: [-6, 3, -2], drift: -1.2, holder: true },
  { palette: "coral", pos: [1.9, -0.9, -0.9], rot: [0.02, -0.5, 0.12], from: [6, -3, -2], drift: -0.8 },
  { palette: "ivory", pos: [-0.8, -1.9, -1.9], rot: [0.12, 0.2, -0.3], from: [-2, -7, -6], drift: -0.4 },
];

function Card({ cfg, assembled, scroll }: { cfg: CardCfg; assembled: RefObject<number>; scroll: RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const tex = useMemo(() => makeCardTexture(PALETTES[cfg.palette], cfg.chip), [cfg.palette, cfg.chip]);
  const target = useMemo(() => new THREE.Vector3(...cfg.pos), [cfg.pos]);
  const from = useMemo(() => new THREE.Vector3(...cfg.from), [cfg.from]);
  const tmpRef = useRef(new THREE.Vector3());

  useFrame(({ clock }) => {
    if (!group.current) return;
    const tmp = tmpRef.current;
    const a = assembled.current ?? 0;
    const s = scroll.current ?? 0;
    tmp.lerpVectors(from, target, a);
    const t = clock.elapsedTime;
    // slow float + scroll drift (cards separate as the section leaves)
    tmp.y += Math.sin(t * 0.6 + target.x) * 0.06;
    tmp.z += cfg.drift * s + Math.sin(t * 0.4 + target.y) * 0.04;
    tmp.x += target.x * s * 0.6;
    group.current.position.copy(tmp);
    group.current.rotation.set(
      cfg.rot[0] + (1 - a) * 0.8 + Math.sin(t * 0.5) * 0.015,
      cfg.rot[1] + (1 - a) * -1.2 + Math.cos(t * 0.45) * 0.02,
      cfg.rot[2] + (1 - a) * 0.5,
    );
  });

  return (
    <group ref={group}>
      <RoundedBox args={[CARD_W, CARD_H, CARD_D]} radius={0.09} smoothness={6} castShadow>
        <meshPhysicalMaterial color="#f3eee4" roughness={0.45} clearcoat={0.8} clearcoatRoughness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0, CARD_D / 2 + 0.001]}>
        <planeGeometry args={[CARD_W - 0.06, CARD_H - 0.06]} />
        <meshPhysicalMaterial map={tex} roughness={0.35} clearcoat={1} clearcoatRoughness={0.18} />
      </mesh>
      {cfg.holder && (
        <mesh position={[0, -0.1, -0.02]}>
          <boxGeometry args={[CARD_W + 0.18, CARD_H + 0.1, 0.02]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.9} thickness={0.2} roughness={0.15} transparent opacity={0.5} />
        </mesh>
      )}
      {cfg.lanyard && <Lanyard />}
    </group>
  );
}

function Lanyard() {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, CARD_H / 2 - 0.1, 0.03),
        new THREE.Vector3(-0.15, CARD_H / 2 + 0.6, 0.1),
        new THREE.Vector3(-0.6, CARD_H / 2 + 2.2, 0.25),
        new THREE.Vector3(-1.1, CARD_H / 2 + 4.5, 0.4),
      ]),
    [],
  );
  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 40, 0.055, 12, false]} />
        <meshStandardMaterial color="#5b3fd1" roughness={0.9} />
      </mesh>
      <mesh position={[0, CARD_H / 2 - 0.02, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.025, 10, 24]} />
        <meshStandardMaterial color="#c9c4bb" metalness={0.9} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Sheets({ scroll }: { scroll: RefObject<number> }) {
  const g = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!g.current) return;
    g.current.position.z = -3.2 - (scroll.current ?? 0) * 2;
  });
  return (
    <group ref={g} position={[0.6, 0.4, -3.2]} rotation={[0.1, -0.35, 0.12]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6.4, 4.6, 0.02]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      <mesh position={[0.5, -0.4, -0.35]} rotation={[0, 0, -0.06]}>
        <boxGeometry args={[6.4, 4.6, 0.02]} />
        <meshStandardMaterial color="#f0ebe0" roughness={0.7} />
      </mesh>
      <mesh position={[-1.2, 1.7, 0.3]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.7, 0.16, 0.04]} />
        <meshStandardMaterial color="#232028" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

function Rig({ children, scroll }: { children: React.ReactNode; scroll: RefObject<number> }) {
  const g = useRef<THREE.Group>(null);
  useFrame(({ pointer }, dt) => {
    if (!g.current) return;
    const k = 1 - Math.pow(0.001, dt);
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, pointer.x * 0.14, k);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -pointer.y * 0.08, k);
    g.current.position.z = THREE.MathUtils.lerp(g.current.position.z, -(scroll.current ?? 0) * 2.4, k);
    g.current.position.y = THREE.MathUtils.lerp(g.current.position.y, (scroll.current ?? 0) * 1.2, k);
  });
  return <group ref={g}>{children}</group>;
}

export default function HeroScene({ scroll }: { scroll: RefObject<number> }) {
  const assembled = useRef(0);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows
      onCreated={() => {
        gsap.to(assembled, { current: 1, duration: 2.2, ease: "expo.out", delay: 0.2 });
      }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 6]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-6, 2, 3]} intensity={0.6} color="#ffe2d1" />
      <Rig scroll={scroll}>
        <Sheets scroll={scroll} />
        {CARDS.map((c) => (
          <Card key={c.palette} cfg={c} assembled={assembled} scroll={scroll} />
        ))}
        <ContactShadows position={[0, -3.1, 0]} opacity={0.35} scale={14} blur={2.6} far={5} color="#16141a" />
      </Rig>
    </Canvas>
  );
}
