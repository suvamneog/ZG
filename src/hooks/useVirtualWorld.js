import { useState, useCallback } from 'react';

export function useVirtualWorld() {
  const [activeObject, setActiveObject] = useState(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0, z: 10 });

  const handleObjectClick = useCallback((objectId) => {
    setActiveObject(objectId);
  }, []);

  const closeHologram = useCallback(() => {
    setActiveObject(null);
  }, []);

  const updatePlayerPosition = useCallback((position) => {
    setPlayerPosition(position);
  }, []);

  return {
    activeObject,
    playerPosition,
    handleObjectClick,
    closeHologram,
    updatePlayerPosition
  };
}
