"use client"; // this is a client component 👈🏽

import Head from 'next/head'
import { Suspense } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { Environment, OrbitControls, useTexture } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three";

function Sphere() {
  const colorMap = useTexture("/images/car-reflection.jpg");
  return (
    <mesh visible userData={{ test: "hello" }} position={[0, 0, 0]} castShadow>
      <sphereGeometry attach="geometry" args={[20, 30, 30]} />
      <meshStandardMaterial
        attach="material"
        map={colorMap}
        color="white"
        side={THREE.DoubleSide}
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

export default function spherefull() {
  return (
    <Sphere />
  )
}