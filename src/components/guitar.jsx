import { Outlines, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { useControls } from "leva";
import { Vector3 } from "three";

const mirror = ({ scale, x, y }) => {
  const flipScale = new THREE.Vector3(scale[0], scale[1], scale[2]);
  if (x) {
    flipScale.x *= -1;
  }
  if (y) {
    flipScale.z *= -1;
  }
  return flipScale;
};

const strings = [
  {
    scale: [0.01, 3.52, 0.01],
    position: [-0.04, 0.95, 0.06],
    rotation: [0.99, -0.01, 1.56],
    note: "bigE",
  },
  {
    scale: [0.01, 3.52, 0.01],
    position: [-0.04, 0.91, 0.06],
    rotation: [0.99, -0.01, 1.56],
    note: "A",
  },
  {
    scale: [0.01, 3.52, 0.01],
    position: [-0.04, 0.86, 0.06],
    rotation: [0.99, -0.01, 1.56],
    note: "D",
  },
  {
    scale: [0.01, 3.52, 0.01],
    position: [-0.04, 0.8, 0.06],
    rotation: [0.99, -0.01, 1.56],
    note: "G",
  },
  {
    scale: [0.01, 3.52, 0.01],
    position: [-0.04, 0.75, 0.06],
    rotation: [0.99, -0.01, 1.56],
    note: "B",
  },
  {
    scale: [0.01, 3.52, 0.01],
    position: [-0.04, 0.7, 0.06],
    rotation: [0.99, -0.01, 1.56],
    note: "smallE",
  },
];

export function Guitar() {
  const { nodes, materials, scene } = useGLTF("./guitar/scene.gltf");
  const groupRef = useRef(null);
  // console.log(mirror({scale: [1,1,1], x:true, y:true}))
  const gRotation = [-0.3, 0.6, -1.5];
  const gPosition = [2.05, 0.9, 2.9];

  const stringsPosition = [0.08, -0.03, 0];

  const { scale, position, rotation } = useControls({
    scale: { value: [1, , 1, 1], step: 0.01 },
    position: { value: [0, 0, 0], step: 0.01 },
    rotation: { value: [0, 0, 0], step: 0.01 },
  });

  function playNote(note) {
    new Audio(
      "./songs/looperman-l-2273068-0344887-indie-x-rnb-type-guitar.wav"
    ).play();
  }

  return (
    <group
      rotateY={Math.PI}
      rotation={gRotation}
      position={gPosition}
      scale={[-1, -1, 1]}
    >
      <primitive object={scene} />
      <group position={stringsPosition} rotation={rotation}>
        {strings.map((string) => (
          <mesh
            onClick={() => playNote(string.note)}
            scale={string.scale}
            key={string.note}
            rotation={string.rotation}
            position={string.position}
          >
            <cylinderGeometry />
            <meshBasicMaterial />
            <Outlines thickness={0.05} color="hotpink" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
