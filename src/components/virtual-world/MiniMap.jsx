import { Music, Film, Award, BookOpen } from 'lucide-react';

export function MiniMap({ playerPosition, objects }) {
  const scale = 5;
  const mapSize = 150;

  const toMapCoords = (x, z) => {
    return {
      x: (x * scale) + mapSize / 2,
      y: (z * scale) + mapSize / 2
    };
  };

  const getIcon = (type) => {
    switch (type) {
      case 'discography':
        return <Music size={12} />;
      case 'filmography':
        return <Film size={12} />;
      case 'achievements':
        return <Award size={12} />;
      case 'about':
        return <BookOpen size={12} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm border-2 border-cyan-400/50 rounded-lg p-3 w-40 h-40">
      <div className="relative w-full h-full">
        <svg width={mapSize} height={mapSize} className="w-full h-full">
          <rect width={mapSize} height={mapSize} fill="#0a0a0a" stroke="#333" strokeWidth="1" />

          <line x1="0" y1={mapSize / 2} x2={mapSize} y2={mapSize / 2} stroke="#222" strokeWidth="1" />
          <line x1={mapSize / 2} y1="0" x2={mapSize / 2} y2={mapSize} stroke="#222" strokeWidth="1" />

          {objects.map((obj) => {
            const pos = toMapCoords(obj.position[0], obj.position[2]);
            return (
              <circle
                key={obj.id}
                cx={pos.x}
                cy={pos.y}
                r="4"
                fill={obj.color}
                opacity="0.8"
              />
            );
          })}

          {playerPosition && (() => {
            const pos = toMapCoords(playerPosition.x, playerPosition.z);
            return (
              <>
                <circle cx={pos.x} cy={pos.y} r="6" fill="#ffd700" opacity="0.5" />
                <circle cx={pos.x} cy={pos.y} r="3" fill="#ffd700" />
              </>
            );
          })()}
        </svg>
      </div>

      <div className="absolute top-1 left-1 text-cyan-400 text-xs font-semibold">
        MAP
      </div>
    </div>
  );
}
