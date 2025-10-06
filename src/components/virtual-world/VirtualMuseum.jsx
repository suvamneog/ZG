import { Canvas } from '@react-three/fiber';
import { MuseumRoom } from './MuseumRoom';
import { PlayerController } from './PlayerController';
import { InteractiveObject } from './InteractiveObject';
import { HologramContent } from './HologramContent';
import { MiniMap } from './MiniMap';
import { useVirtualWorld } from '../../hooks/useVirtualWorld';

const interactiveObjects = [
  {
    id: 'music-studio',
    position: [-8, 1.5, -8],
    type: 'discography',
    title: 'Music Studio',
    description: "Explore Zubeen's musical journey through decades of melodies",
    icon: '🎵',
    color: '#ffd700',
    link: '/discography'
  },
  {
    id: 'film-set',
    position: [8, 1.5, -8],
    type: 'filmography',
    title: 'Film Career',
    description: 'Discover his iconic roles in Assamese and Bollywood cinema',
    icon: '🎬',
    color: '#ff6b6b',
    link: '/filmography'
  },
  {
    id: 'awards-gallery',
    position: [8, 1.5, 8],
    type: 'achievements',
    title: 'Awards Gallery',
    description: 'Celebrate his remarkable achievements and accolades',
    icon: '🏆',
    color: '#4ecdc4',
    link: '/achievements'
  },
  {
    id: 'biography',
    position: [-8, 1.5, 8],
    type: 'about',
    title: 'Biography',
    description: 'Learn about the life and legacy of the musical maestro',
    icon: '📖',
    color: '#a78bfa',
    link: '/about'
  }
];

export function VirtualMuseum() {
  const { activeObject, playerPosition, handleObjectClick, closeHologram, updatePlayerPosition } = useVirtualWorld();

  const activeObjectData = interactiveObjects.find(obj => obj.id === activeObject);

  return (
    <div className="w-full h-screen relative">
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000 }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
        }}
      >
        <MuseumRoom />
        <PlayerController onPositionChange={updatePlayerPosition} />

        {interactiveObjects.map((obj) => (
          <InteractiveObject
            key={obj.id}
            position={obj.position}
            color={obj.color}
            icon={obj.icon}
            title={obj.title}
            onClick={() => handleObjectClick(obj.id)}
          />
        ))}

        {activeObjectData && (
          <HologramContent object={activeObjectData} onClose={closeHologram} />
        )}
      </Canvas>

      <MiniMap playerPosition={playerPosition} objects={interactiveObjects} />

      <div className="fixed top-4 left-4 bg-black/80 backdrop-blur-sm border-2 border-cyan-400/50 rounded-lg p-4 text-white max-w-xs">
        <h3 className="text-lg font-bold text-cyan-400 mb-2">Controls</h3>
        <div className="text-sm space-y-1 text-gray-300">
          <p><strong>WASD</strong> - Move</p>
          <p><strong>Mouse</strong> - Look around</p>
          <p><strong>Shift</strong> - Sprint</p>
          <p><strong>Click</strong> - Interact with objects</p>
        </div>
        <p className="text-xs text-cyan-400 mt-3">Click anywhere to lock camera</p>
      </div>

      <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-sm border-2 border-yellow-400/50 rounded-lg p-4 text-center max-w-xs">
        <h2 className="text-2xl font-bold text-yellow-400 mb-1">Zubeen Garg</h2>
        <p className="text-sm text-gray-300">Virtual Museum</p>
      </div>
    </div>
  );
}
