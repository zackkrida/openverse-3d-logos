import React, { useRef, useState, Suspense } from "react"
import {
  Canvas,
  MeshProps,
  SphereGeometryProps,
  useFrame,
} from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { DoubleSide, Euler, Group, Mesh, TextGeometry, Vector3 } from "three"

function Sphere(props: MeshProps & { geoArgs?: SphereGeometryProps["args"] }) {
  const geoArgs = props.geoArgs ?? [1, 32, 32]
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh {...props} scale={0.8}>
      <sphereBufferGeometry args={geoArgs} />
      <meshStandardMaterial metalness={1} roughness={0} side={DoubleSide} />
    </mesh>
  )
}

const HalfSphere = (props: MeshProps) => {
  return (
    <group>
      <Sphere
        {...props}
        rotation={new Euler(1.5, 0, 1.5)}
        geoArgs={[1, 32, 32, 0, 2 * Math.PI, 0, 0.5 * Math.PI]}
      />
      <mesh scale={0.8} {...props} rotation={new Euler(0, 1.6, 1.5)}>
        <circleBufferGeometry args={[1, 32, 32]} />
        <meshStandardMaterial metalness={1} roughness={0} side={DoubleSide} />
      </mesh>
    </group>
  )
}

function OpenverseLogo() {
  const groupRef = useRef<Group>(null)

  // useFrame((state, delta) => {
  //   if (!groupRef.current) return
  //   groupRef.current.rotation.y += 0.01
  //   groupRef.current.rotation.z += 0.01
  // })

  return (
    <group ref={groupRef}>
      {/* top row */}
      <HalfSphere position={[-1, 0.9, 0]} />
      <HalfSphere position={[0, 0.9, 0]} />
      <Sphere position={[1, 0.9, 0]} />

      {/* bottom row */}
      <HalfSphere position={[-1, -0.9, 0]} />
      <HalfSphere position={[0, -0.9, 0]} />
      <Sphere position={[1, -0.9, 0]} />
    </group>
  )
}

export default function Home() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <OrbitControls
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}
        />
        <Environment preset="sunset" background />
        <OpenverseLogo />
      </Suspense>
    </Canvas>
  )
}
