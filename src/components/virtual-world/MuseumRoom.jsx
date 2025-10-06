import * as THREE from 'three';

export function MuseumRoom() {
  return (
    <>
      <color attach="background" args={['#0a0a0a']} />

      <ambientLight intensity={0.3} />
      <pointLight position={[0, 10, 0]} intensity={1} color="#ffd700" />
      <spotLight
        position={[-10, 8, -10]}
        angle={0.3}
        penumbra={0.5}
        intensity={1.5}
        castShadow
        color="#6366f1"
      />
      <spotLight
        position={[10, 8, -10]}
        angle={0.3}
        penumbra={0.5}
        intensity={1.5}
        castShadow
        color="#ec4899"
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      <mesh position={[0, 0, -20]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#0f0f0f" side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[-20, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#0f0f0f" side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[20, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#0f0f0f" side={THREE.DoubleSide} />
      </mesh>

      <gridHelper args={[40, 40, '#333333', '#1a1a1a']} position={[0, 0.01, 0]} />
    </>
  );
}
