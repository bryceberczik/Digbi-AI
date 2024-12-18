import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const GeoSphere = () => {
  const { scene } = useGLTF("/models/geo-sphere.glb");
  const sphereRef = useRef<THREE.Object3D>();

  const amplitude = 0.2;
  const speed = 0.5;
  useFrame(({ clock }) => {
    if (sphereRef.current) {

      sphereRef.current.position.y = amplitude * Math.sin(clock.elapsedTime * speed);
      sphereRef.current.rotation.y += 0.002;
    }
  });

  return <primitive ref={sphereRef} object={scene} scale={2} />;
};

const GeoComp = () => {
  return (
    <Canvas>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} />
      <GeoSphere />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        minDistance={6.5}
        maxDistance={6.5}
      />
    </Canvas>
  );
};

export default GeoComp;
