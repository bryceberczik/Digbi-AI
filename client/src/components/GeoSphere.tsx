// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import { useRef } from "react";
// import * as THREE from "three";

// const GeoSphere = ({ loading }: { loading: boolean }) => {
//   const { scene } = useGLTF("/models/geo-sphere.glb");
//   const sphereRef = useRef<THREE.Object3D>();

//   const amplitude = 0.3;
//   const baseSpeed = 0.002; // Normal speed
//   const fastSpeed = 0.05;  // Speed during loading

//   useFrame(({ clock }) => {
//     if (sphereRef.current) {
//       sphereRef.current.position.y = amplitude * Math.sin(clock.elapsedTime * 0.5);
//       sphereRef.current.rotation.y += loading ? fastSpeed : baseSpeed;
//     }
//   });

//   return <primitive ref={sphereRef} object={scene} scale={3} />;
// };

// const CameraLight = () => {
//   const lightRef = useRef<THREE.PointLight>(null);

//   useFrame(({ camera }) => {
//     if (lightRef.current) {
//       lightRef.current.position.copy(camera.position);
//     }
//   });

//   return (
//     <pointLight
//       ref={lightRef}
//       intensity={10} // Adjusted intensity to reduce harsh shadows
//       distance={20} // Increased distance for softer falloff
//     />
//   );
// };

// const GeoComp = ({ loading }: { loading: boolean }) => {
//   return (
//     <Canvas>
//       <ambientLight intensity={1} />
//       <CameraLight />
//       <GeoSphere loading={loading} />
//       <OrbitControls
//         enableZoom={false}
//         enablePan={false}
//         enableRotate={true}
//         minPolarAngle={Math.PI / 2}
//         maxPolarAngle={Math.PI / 2}
//         mouseButtons={{
//           LEFT: THREE.MOUSE.ROTATE,
//           RIGHT: undefined,
//           MIDDLE: undefined,
//         }}
//       />
//     </Canvas>
//   );
// };

// export default GeoComp;
