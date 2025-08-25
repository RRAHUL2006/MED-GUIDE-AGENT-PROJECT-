"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"

interface Video3DPlayerProps {
  videoUrl: string
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
}

function VideoPlane({
  videoUrl,
  isPlaying,
  onPlay,
  onPause,
  videoElement,
}: Video3DPlayerProps & { videoElement: HTMLVideoElement | null }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null)

  useEffect(() => {
    if (videoElement) {
      const texture = new THREE.VideoTexture(videoElement)
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.format = THREE.RGBAFormat
      texture.needsUpdate = true
      setVideoTexture(texture)

      const handlePlay = () => {
        texture.needsUpdate = true
        onPlay()
      }
      const handlePause = () => onPause()

      videoElement.addEventListener("play", handlePlay)
      videoElement.addEventListener("pause", handlePause)

      return () => {
        videoElement.removeEventListener("play", handlePlay)
        videoElement.removeEventListener("pause", handlePause)
        texture.dispose()
      }
    }
  }, [videoUrl, onPlay, onPause, videoElement])

  useEffect(() => {
    if (videoElement) {
      if (isPlaying) {
        videoElement.play().catch((error) => {
          console.error("[v0] Video play error:", error)
        })
      } else {
        videoElement.pause()
      }
    }
  }, [isPlaying, videoElement])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
    if (videoTexture && videoElement && !videoElement.paused) {
      videoTexture.needsUpdate = true
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[4, 2.25]} />
      <meshBasicMaterial map={videoTexture} side={THREE.DoubleSide} transparent={false} />
    </mesh>
  )
}

export function Video3DPlayer({ videoUrl, isPlaying, onPlay, onPause }: Video3DPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      video.crossOrigin = "anonymous"
      video.loop = true
      video.muted = false
      video.playsInline = true
    }
  }, [videoUrl])

  return (
    <div className="w-full h-64 bg-black rounded-lg overflow-hidden">
      <video ref={videoRef} src={videoUrl} style={{ display: "none" }} preload="auto" crossOrigin="anonymous" />
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <VideoPlane
          videoUrl={videoUrl}
          isPlaying={isPlaying}
          onPlay={onPlay}
          onPause={onPause}
          videoElement={videoRef.current}
        />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
