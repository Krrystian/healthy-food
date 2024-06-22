"use client";
import { cn } from "@/app/lib/cn";
import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

const Mesh = React.memo(
  ({
    geometry,
    material,
    scale,
    rotation,
    velocity,
    position,
  }: {
    geometry: THREE.Mesh["geometry"];
    material: THREE.Mesh["material"];
    scale?: number;
    rotation?: THREE.Euler;
    velocity?: number;
    position?: THREE.Vector3;
  }) => (
    <Float speed={velocity}>
      <mesh
        geometry={geometry}
        material={material}
        scale={scale}
        rotation={rotation}
        position={position}
      />
    </Float>
  )
);

interface BackgroundProps {
  loading: () => void;
}

const Background: React.FC<BackgroundProps> = ({ loading }) => {
  const { nodes } = useGLTF("/food2.glb");

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

  return (
    <div className={cn("absolute w-screen h-screen -z-10 bg-orange-300")}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 9]} />
        <Environment preset="sunset" />
        <group>
          <Mesh
            scale={6}
            geometry={(nodes.banana002 as THREE.Mesh).geometry}
            material={(nodes.banana002 as THREE.Mesh).material}
            rotation={new THREE.Euler(0, 60, 0)}
            position={new THREE.Vector3(-4, 0, 0)}
            velocity={2}
          />
          <Mesh
            scale={12}
            geometry={(nodes.Strawberry001 as THREE.Mesh).geometry}
            material={(nodes.Strawberry001 as THREE.Mesh).material}
            position={new THREE.Vector3(-4, 2, 0)}
            velocity={2}
          />
          <Mesh
            scale={6}
            geometry={(nodes.yellow002 as THREE.Mesh).geometry}
            material={(nodes.yellow002 as THREE.Mesh).material}
            position={new THREE.Vector3(-7, -0.5, 0)}
            velocity={2}
          />
          <Mesh
            scale={6}
            geometry={(nodes.Mango_01 as THREE.Mesh).geometry}
            material={(nodes.Mango_01 as THREE.Mesh).material}
            position={new THREE.Vector3(0, -2, 0)}
            rotation={new THREE.Euler(0, 90, 0)}
            velocity={2}
          />
          <Mesh
            scale={6}
            geometry={(nodes.Kiwi001 as THREE.Mesh).geometry}
            material={(nodes.Kiwi001 as THREE.Mesh).material}
            position={new THREE.Vector3(0, 2, 0)}
            velocity={2}
          />
        </group>
      </Canvas>
    </div>
  );
};

export default Background;
