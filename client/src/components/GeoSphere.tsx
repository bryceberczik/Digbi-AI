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

  return <primitive ref={sphereRef} object={scene} scale={3} />;
};

const CameraLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ camera }) => {
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={10} // Adjusted intensity to reduce harsh shadows
      distance={20} // Increased distance for softer falloff
    />
  );
};

const GeoComp = () => {
  return (
    <Canvas>
      {/* Ambient Light for even illumination */}
      <ambientLight intensity={1}/>

      {/* PointLight that follows the user's camera */}
      <CameraLight />
      
      {/* The GeoSphere component, which contains the moving sphere */}
      <GeoSphere />
      
      <OrbitControls
        enableZoom={false} // Disable zoom
        enablePan={false} // Disable panning
        enableRotate={true} // Enable rotation
        minPolarAngle={Math.PI / 2} // Restrict vertical movement to a single plane
        maxPolarAngle={Math.PI / 2} // Restrict vertical movement to a single plane
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE, // Enable left-click for rotation
          RIGHT: undefined, // Disable right-click
          MIDDLE: undefined, // Disable middle-click
        }}
      />
    </Canvas>
  );
};

export default GeoComp;
