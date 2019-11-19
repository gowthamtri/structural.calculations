import React, { useRef } from "react";

const Slab = () => {
    const ref = useRef();

    return (
      <mesh
        ref={ref}
        onClick={e => console.log('click')}
        onPointerOver={e => console.log('hover')}
        onPointerOut={e => console.log('unhover')}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshNormalMaterial attach="material" />
      </mesh>
    )
  }

export default Slab;