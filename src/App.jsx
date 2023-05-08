import { Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import Model from "./Model";

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [1 + state.mouse.x / 4, 1.5 + state.mouse.y / 4, 2.5],
      0.2,
      delta
    );
  });
}


const animations = [
  "pockets",
  "rope",
  "swingdance",
  "jump",
  "react",
  "shrug",
  "wave",
  "golf",
  "idle"
]

export default function App() {
  const [index, setIndex] = useState(0);
  const handleClick = (i) => { 
    setIndex(i%9)
  }
    return (
    <div className="animation">
      <Canvas shadows camera={{ position: [1, 1.5, 2.5], fov: 50 }}>
        <ambientLight />
          <directionalLight
          position={[-5, 5, 5]}
          castShadow
          shadow-mapSize={1024}
          />
          <group position={[0, -1, 0]}>
            <Suspense fallback={null}>
              <Model index={index}/>
            </Suspense>
          </group>
          <mesh
            rotation={[-0.5 * Math.PI, 0, 0]}
            position={[0, -1, 0]}
            receiveShadow>
            <planeBufferGeometry args={[10, 10, 1, 1]} />
            <shadowMaterial transparent opacity={0.2} />
          </mesh>
        <Rig />
        </Canvas>
        <div className="buttons">
          {animations.map((animation, i) =>
          (
            <button className="button is-info"
              key={animation + i}
              onClick={()=>handleClick(i)}
            >{animation}</button>
          ))}
         
        </div>
    </div>
  );
}
