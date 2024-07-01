"use client";
import { cn } from "@/app/lib/cn";
import React, { use } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  useGLTF,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion-3d";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

const MeshR = ({
  geometry,
  material,
  scale,
  rotation = new THREE.Euler(0, 0, 0),
  position = new THREE.Vector3(0, 0, 0),
  materialSettings,
  mouse,
  multiplier = 0.3,
}: {
  geometry: THREE.Mesh["geometry"];
  material?: THREE.Mesh["material"];
  scale?: number;
  rotation?: THREE.Euler;
  position?: THREE.Vector3;
  materialSettings?: any;
  mouse: any;
  multiplier?: number;
}) => {
  const a = multiplier / 2;
  const rotationX = useTransform(
    mouse.x,
    [0, 1],
    [rotation.x - a, rotation.x + a]
  );
  const rotationY = useTransform(
    mouse.y,
    [0, 1],
    [rotation.y - a, rotation.y + a]
  );
  const positionX = useTransform(
    mouse.x,
    [0, 1],
    [position.x - multiplier * 2, position.x + multiplier * 2]
  );
  const positionY = useTransform(
    mouse.y,
    [0, 1],
    [position.y + multiplier * 2, position.y - multiplier * 2]
  );

  return (
    <motion.mesh
      geometry={geometry}
      material={material}
      scale={scale}
      rotation={rotation}
      position={position}
      rotation-y={rotationX}
      rotation-x={rotationY}
      position-x={positionX}
      position-y={positionY}
    >
      <MeshTransmissionMaterial {...materialSettings} />
    </motion.mesh>
  );
};
const Mesh = React.memo(MeshR);
Mesh.displayName = "Mesh";

interface BackgroundProps {
  loading: () => void;
}

const Background: React.FC<BackgroundProps> = ({ loading }) => {
  // const { nodes } = useGLTF("/food3-v2.glb");
  const { nodes } = useGLTF("/food3-low-poly.glb");
  React.useEffect(() => {
    loading();
  }, [nodes, loading]);

  //WINDOW RESIZE
  const [scale, setScale] = React.useState(1);
  const handleResize = React.useCallback(() => {
    setScale(window.innerWidth < 900 ? 0.5 : 1);
  }, []);

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", manageMouse);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", manageMouse);
    };
  }, [handleResize]);

  // const materialProps = {
  //   thickness: 0.7,
  //   roughness: 0.35,
  //   transmission: 1,
  //   ior: 1.2,
  //   chromaticAberration: 0.8,
  //   distortion: 0.8,
  //   distortionScale: 1,
  //   temporalDistortion: 0.3,
  //   color: "#FE03A7",
  // };

  // FOR LOW POLY
  const materialProps = {
    thickness: 0.2,
    roughness: 0.4,
    transmission: 1,
    ior: 1.75,
    chromaticAberration: 0.5,
    distortion: 0.15,
    distortionScale: 1.5,
    temporalDistortion: 1,
    color: "#FE03A7",
  };

  //MOUSE MOVEMENT
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };
  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 75, damping: 100, mass: 3 }),
    y: useSpring(mouse.y, { stiffness: 75, damping: 100, mass: 3 }),
  };
  const manageMouse = (e: any) => {
    const { innerWidth, innerHeight } = window;
    const { clientX, clientY } = e;
    const x = clientX / innerWidth;
    const y = clientY / innerHeight;
    mouse.x.set(x);
    mouse.y.set(y);
  };

  return (
    <div className={cn("absolute w-screen h-screen")}>
      <Canvas
        style={{ backgroundColor: "#023047" }}
        orthographic
        camera={{ position: [0, 0, 200], zoom: 100 }}
      >
        {/* <PerspectiveCamera makeDefault position={[0, 0, 9]} /> */}
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
          {/* floatingRange={[-0.25, 0.25]} */}
          <Float
            speed={1.2}
            floatingRange={[-0.25, 0.25]}
            rotationIntensity={2}
          >
            {/* NOT POLLY */}
            {/* <Mesh
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
            /> */}
            {/* POLLY */}
            <Mesh
              geometry={(nodes.Mango as THREE.Mesh).geometry}
              materialSettings={materialProps}
              position={new THREE.Vector3(0, -1, 0)}
              mouse={smoothMouse}
            />
            <Mesh
              geometry={(nodes.Lemon as THREE.Mesh).geometry}
              materialSettings={materialProps}
              position={new THREE.Vector3(-6, -4, 0)}
              scale={1.5}
              mouse={smoothMouse}
              multiplier={0.5}
            />
            <Mesh
              geometry={(nodes.Banana as THREE.Mesh).geometry}
              materialSettings={materialProps}
              position={new THREE.Vector3(-6, 2, 0)}
              scale={1.2}
              mouse={smoothMouse}
              multiplier={0.5}
            />
            <Mesh
              geometry={(nodes.Grapes as THREE.Mesh).geometry}
              materialSettings={materialProps}
              position={new THREE.Vector3(-3, 0, 0)}
              rotation={new THREE.Euler(45, 0, 0)}
              scale={0.5}
              mouse={smoothMouse}
              multiplier={0.7}
            />
            <Mesh
              geometry={(nodes.Apple as THREE.Mesh).geometry}
              materialSettings={materialProps}
              position={new THREE.Vector3(0.5, 2, 0)}
              scale={1.3}
              mouse={smoothMouse}
              multiplier={0.6}
            />
            <Mesh
              geometry={(nodes.Apple as THREE.Mesh).geometry}
              materialSettings={materialProps}
              position={new THREE.Vector3(-2, -3, 0)}
              scale={1.3}
              mouse={smoothMouse}
              multiplier={1}
            />
          </Float>
        </group>
      </Canvas>
    </div>
  );
};

export default Background;

useGLTF.preload("/food3-low-poly.glb");
// useGLTF.preload("/food3-v2.glb");
