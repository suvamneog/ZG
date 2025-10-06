import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';

export function PlayerController({ onPositionChange }) {
  const { camera } = useThree();
  const movement = useKeyboardControls();

  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const rotation = useRef({ x: 0, y: 0 });
  const isPointerLocked = useRef(false);

  useEffect(() => {
    camera.position.set(0, 2, 10);
    camera.rotation.order = 'YXZ';

    const handlePointerMove = (e) => {
      if (!isPointerLocked.current) return;

      const sensitivity = 0.002;
      rotation.current.y -= e.movementX * sensitivity;
      rotation.current.x -= e.movementY * sensitivity;
      rotation.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.current.x));
    };

    const handlePointerLockChange = () => {
      isPointerLocked.current = document.pointerLockElement !== null;
    };

    const handleClick = () => {
      if (!isPointerLocked.current) {
        document.body.requestPointerLock();
      }
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('click', handleClick);
    };
  }, [camera]);

  useFrame((state, delta) => {
    const speed = movement.sprint ? 8 : 4;

    direction.current.set(0, 0, 0);

    if (movement.forward) direction.current.z -= 1;
    if (movement.backward) direction.current.z += 1;
    if (movement.left) direction.current.x -= 1;
    if (movement.right) direction.current.x += 1;

    direction.current.normalize();

    camera.rotation.y = rotation.current.y;
    camera.rotation.x = rotation.current.x;

    const moveDirection = direction.current.clone();
    moveDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.current.y);

    velocity.current.x = moveDirection.x * speed * delta;
    velocity.current.z = moveDirection.z * speed * delta;

    camera.position.add(velocity.current);

    const boundarySize = 15;
    camera.position.x = Math.max(-boundarySize, Math.min(boundarySize, camera.position.x));
    camera.position.z = Math.max(-boundarySize, Math.min(boundarySize, camera.position.z));
    camera.position.y = 2;

    if (onPositionChange) {
      onPositionChange({
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
      });
    }
  });

  return null;
}
