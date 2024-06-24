"use client";
import { cn } from "@/app/lib/cn";
import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  PerspectiveCamera,
  useGLTF,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { distance } from "framer-motion";

const Mesh = React.memo(
  ({
    geometry,
    material,
    scale,
    rotation,
    velocity,
    position,
    materialSettings,
  }: {
    geometry: THREE.Mesh["geometry"];
    material: THREE.Mesh["material"];
    scale?: number;
    rotation?: THREE.Euler;
    velocity?: number;
    position?: THREE.Vector3;
    materialSettings?: any;
  }) => (
    <Float speed={velocity}>
      <mesh
        geometry={geometry}
        material={material}
        scale={scale}
        rotation={rotation}
        position={position}
      >
        <MeshTransmissionMaterial {...materialSettings} />
      </mesh>
    </Float>
  )
);

Mesh.displayName = "Mesh";

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
  const materialProps = useControls({
    thickness: 0.2,
    roughness: 0.2,
    transmission: 1,
    ior: 1.2,
    chromaticAberration: 0.8,
    distortion: 0.3,
    distortionScale: 0.3,
    temporalDistortion: 0.3,
  });
  return (
    <div className={cn("absolute w-screen h-screen")}>
      <Canvas style={{ backgroundColor: "black" }}>
        <PerspectiveCamera makeDefault position={[0, 0, 9]} />
        <Environment preset="sunset" />
        <group scale={scale}>
          <Text position={[-3.4, 0, 0]} fontSize={1.4}>
            Healthy You
          </Text>

          <Mesh
            scale={0.3}
            geometry={(nodes.banana002 as THREE.Mesh).geometry}
            material={(nodes.banana002 as THREE.Mesh).material}
            rotation={new THREE.Euler(0, 0, 0)}
            position={new THREE.Vector3(0.5, -0.5, 1)}
            velocity={2}
            materialSettings={materialProps}
          />
          <Mesh
            scale={0.1}
            geometry={(nodes.Strawberry001 as THREE.Mesh).geometry}
            material={(nodes.Strawberry001 as THREE.Mesh).material}
            position={new THREE.Vector3(-6, 2, 0)}
            velocity={2}
            materialSettings={materialProps}
          />

          <Mesh
            scale={0.2}
            geometry={(nodes.yellow002 as THREE.Mesh).geometry}
            material={(nodes.yellow002 as THREE.Mesh).material}
            position={new THREE.Vector3(-4, 0, 1)}
            velocity={2}
            materialSettings={materialProps}
          />

          <Mesh
            scale={15}
            geometry={(nodes.Mango_01 as THREE.Mesh).geometry}
            material={(nodes.Mango_01 as THREE.Mesh).material}
            position={new THREE.Vector3(-3, -3, 0)}
            rotation={new THREE.Euler(0, 90, 0)}
            velocity={2}
            materialSettings={materialProps}
          />

          <Mesh
            scale={2}
            geometry={(nodes.Kiwi001 as THREE.Mesh).geometry}
            material={(nodes.Kiwi001 as THREE.Mesh).material}
            position={new THREE.Vector3(-7, -2, 0)}
            velocity={2}
            materialSettings={materialProps}
          />
        </group>
      </Canvas>
    </div>
  );
};

export default Background;
