"use client";
import { cn } from "@/app/lib/cn";
import React, { use } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  PerspectiveCamera,
  useGLTF,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { useMotionValue, useSpring } from "framer-motion";

const Mesh = React.memo(
  ({
    geometry,
    material,
    scale,
    rotation,
    position,
    materialSettings,
  }: {
    geometry: THREE.Mesh["geometry"];
    material?: THREE.Mesh["material"];
    scale?: number;
    rotation?: THREE.Euler;
    position?: THREE.Vector3;
    materialSettings?: any;
    smoothScroll?: any;
  }) => (
    <mesh
      geometry={geometry}
      material={material}
      scale={scale}
      rotation={rotation}
      position={position}
    >
      <MeshTransmissionMaterial {...materialSettings} />
    </mesh>
  )
);

Mesh.displayName = "Mesh";
useGLTF.preload("/food3.glb");

interface BackgroundProps {
  loading: () => void;
}

const Background: React.FC<BackgroundProps> = ({ loading }) => {
  const { nodes } = useGLTF("/food3.glb");

  React.useEffect(() => {
    loading();
  }, [nodes, loading]);

  // RESIZE WINDOW LOGIC
  const [scale, setScale] = React.useState(1);
  const handleResize = React.useCallback(() => {
    setScale(window.innerWidth < 900 ? 0.5 : 1);
  }, []);

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const materialProps = {
    thickness: 0.7,
    roughness: 0.35,
    transmission: 1,
    ior: 1.2,
    chromaticAberration: 0.8,
    distortion: 0.8,
    distortionScale: 1,
    temporalDistortion: 0.3,
    color: "#FE03A7",
  };
  return (
    <div className={cn("absolute w-screen h-screen")}>
      <Canvas style={{ backgroundColor: "#023047" }}>
        <PerspectiveCamera makeDefault position={[0, 0, 9]} />
        <Environment preset="sunset" />
        <group scale={scale}>
          <Text
            font="./fonts/Satoshi-Black.otf"
            color={"#ffb703"}
            position={[-3.8, 4, -1]}
            fontSize={1.4}
          >
            Healthy You
          </Text>
          <Text
            position={[-3.8, 2, -1]}
            fontSize={1.4}
            font="./fonts/Satoshi-Black.otf"
            color={"#ffb703"}
          >
            Healthy You
          </Text>
          <Text
            font="./fonts/Satoshi-Black.otf"
            color={"#ffb703"}
            position={[-3.8, 0, -1]}
            fontSize={1.4}
          >
            Healthy You
          </Text>
          <Text
            position={[-3.8, -2, -1]}
            fontSize={1.4}
            font="./fonts/Satoshi-Black.otf"
            color={"#ffb703"}
          >
            Healthy You
          </Text>
          <Text
            font="./fonts/Satoshi-Black.otf"
            color={"#ffb703"}
            position={[-3.8, -4, -1]}
            fontSize={1.4}
          >
            Healthy You
          </Text>
          <Float speed={1} floatingRange={[-0.25, 0.25]} rotationIntensity={4}>
            <Mesh
              scale={0.3}
              geometry={(nodes.banana002 as THREE.Mesh).geometry}
              rotation={new THREE.Euler(0, 0.6, 0)}
              position={new THREE.Vector3(0.5, 1, 1)}
              materialSettings={materialProps}
            />

            <Mesh
              scale={0.1}
              geometry={(nodes.Strawberry001 as THREE.Mesh).geometry}
              position={new THREE.Vector3(-2, -2, 0)}
              materialSettings={materialProps}
            />
            <Mesh
              scale={0.1}
              geometry={(nodes.yellow002 as THREE.Mesh).geometry}
              position={new THREE.Vector3(-6, -3, 1)}
              rotation={new THREE.Euler(7, 0, 0)}
              materialSettings={materialProps}
            />
            <Mesh
              scale={0.2}
              geometry={(nodes.yellow002 as THREE.Mesh).geometry}
              // material={(nodes.yellow002 as THREE.Mesh).material}
              position={new THREE.Vector3(-3, 1, 1)}
              materialSettings={materialProps}
            />
          </Float>
        </group>
      </Canvas>
    </div>
  );
};

export default Background;
