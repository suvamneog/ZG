import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HologramContent({ object, onClose }) {
  const groupRef = useRef();
  const navigate = useNavigate();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const handleExplore = () => {
    onClose();
    navigate(object.link);
  };

  return (
    <group ref={groupRef} position={object.position}>
      <Html
        transform
        distanceFactor={3}
        position={[0, 2, 0]}
        style={{
          transition: 'all 0.3s',
          opacity: 1,
          transform: 'scale(1)'
        }}
      >
        <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-md border-2 border-cyan-400/50 rounded-lg p-6 w-80 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 animate-pulse rounded-lg" />

          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(6,182,212,0.1)_25%,rgba(6,182,212,0.1)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.1)_75%,rgba(6,182,212,0.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px] animate-[scan_3s_linear_infinite]" />
          </div>

          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-cyan-400 hover:text-cyan-300 transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="relative z-10">
            <div className="text-5xl mb-3 text-center">{object.icon}</div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-2 text-center">
              {object.title}
            </h3>
            <p className="text-gray-300 mb-4 text-center text-sm">
              {object.description}
            </p>

            <button
              onClick={handleExplore}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded transition-all shadow-lg hover:shadow-cyan-500/50"
            >
              Explore More
            </button>
          </div>
        </div>
      </Html>

      <mesh position={[0, 2, 0]}>
        <ringGeometry args={[1.5, 1.7, 32]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
