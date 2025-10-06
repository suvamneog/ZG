import { useEffect, useState } from 'react';

export function useKeyboardControls() {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    sprint: false
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW':
          setMovement((m) => ({ ...m, forward: true }));
          break;
        case 'KeyS':
          setMovement((m) => ({ ...m, backward: true }));
          break;
        case 'KeyA':
          setMovement((m) => ({ ...m, left: true }));
          break;
        case 'KeyD':
          setMovement((m) => ({ ...m, right: true }));
          break;
        case 'Space':
          setMovement((m) => ({ ...m, jump: true }));
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          setMovement((m) => ({ ...m, sprint: true }));
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW':
          setMovement((m) => ({ ...m, forward: false }));
          break;
        case 'KeyS':
          setMovement((m) => ({ ...m, backward: false }));
          break;
        case 'KeyA':
          setMovement((m) => ({ ...m, left: false }));
          break;
        case 'KeyD':
          setMovement((m) => ({ ...m, right: false }));
          break;
        case 'Space':
          setMovement((m) => ({ ...m, jump: false }));
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          setMovement((m) => ({ ...m, sprint: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
}
