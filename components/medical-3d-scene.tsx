"use client"

import type React from "react"

import { Canvas } from "@react-three/fiber"
import { Float, Environment } from "@react-three/drei"
import { useRef } from "react"
import type { Mesh } from "three"

function FloatingMedicalIcon({
  position,
  color,
  children,
}: { position: [number, number, number]; color: string; children: React.ReactNode }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        <boxGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </Float>
  )
}

function DNAHelix({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null)

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={position} ref={meshRef}>
        {/* DNA Helix structure */}
        {Array.from({ length: 8 }).map((_, i) => (
          <group key={i} position={[0, i * 0.2 - 0.8, 0]} rotation={[0, (i * Math.PI) / 4, 0]}>
            <mesh position={[0.2, 0, 0]}>
              <sphereGeometry args={[0.03]} />
              <meshStandardMaterial color="#8b5cf6" />
            </mesh>
            <mesh position={[-0.2, 0, 0]}>
              <sphereGeometry args={[0.03]} />
              <meshStandardMaterial color="#f97316" />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.4]} />
              <meshStandardMaterial color="#6b7280" />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  )
}

function MedicalCross({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={position}>
        {/* Vertical bar */}
        <mesh>
          <boxGeometry args={[0.1, 0.4, 0.05]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        {/* Horizontal bar */}
        <mesh>
          <boxGeometry args={[0.4, 0.1, 0.05]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
      </group>
    </Float>
  )
}

function Pill({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.6}>
      <group position={position}>
        <mesh>
          <capsuleGeometry args={[0.08, 0.2]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
      </group>
    </Float>
  )
}

export function Medical3DScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Environment preset="studio" />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />

        {/* Floating medical elements */}
        <DNAHelix position={[-2, 1, -2]} />
        <DNAHelix position={[2.5, -1, -3]} />

        <MedicalCross position={[-3, -2, -2]} />
        <MedicalCross position={[3, 2, -3]} />

        <Pill position={[-1.5, 2.5, -2]} />
        <Pill position={[1.8, -2.2, -2]} />
        <Pill position={[0.5, 3, -3]} />

        {/* Additional floating elements */}
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
          <mesh position={[-2.5, 0.5, -2]}>
            <torusGeometry args={[0.15, 0.05]} />
            <meshStandardMaterial color="#8b5cf6" transparent opacity={0.7} />
          </mesh>
        </Float>

        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.7}>
          <mesh position={[2, 1.5, -2.5]}>
            <octahedronGeometry args={[0.12]} />
            <meshStandardMaterial color="#06b6d4" transparent opacity={0.6} />
          </mesh>
        </Float>
      </Canvas>
    </div>
  )
}
