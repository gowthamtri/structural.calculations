import React, { useCallback, useFrame, useMemo, useRef, useState } from "react";
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';

export function EndPoint({ position }) {
    return (
        <mesh position={position}  onClick={e => console.log(e)}>
            <sphereBufferGeometry attach="geometry" args={[7.5, 16, 16]} />
            <meshBasicMaterial attach="material" />
        </mesh>
    );
}

export function Line({ defaultStart, defaultEnd }) {
    const [start, setStart] = useState(defaultStart);
    const [end, setEnd] = useState(defaultEnd);
    const vertices = useMemo(() => [start, end].map(v => new THREE.Vector3(...v)), [start, end]);
    const update = useCallback(self => ((self.verticesNeedUpdate = true), self.computeBoundingSphere()), []);
    return (
        <>
            <line>
                <geometry attach="geometry" vertices={vertices} onUpdate={update} />
                <lineBasicMaterial attach="material" color="yellow" />
            </line>
            <EndPoint position={start} />
            <EndPoint position={end} />
        </>
    );
}

const CreepModel = () => {
    const ref = useRef();
    
    return (
        <Canvas>
            <mesh
                ref={ref}
                onClick={e => console.log('click')}
                onPointerOver={e => console.log('hover')}
                onPointerOut={e => console.log('unhover')}>
                <boxBufferGeometry attach="geometry" args={[3, 5, 1]} />
                <meshBasicMaterial attach="material" color="red" />
            </mesh>
            <Line defaultStart={[0, 0, 0]} defaultEnd={[10, 10, 0]} />
            <Line defaultStart={[10, 10, 0]} defaultEnd={[20, 20, 0]} />} />
            <Line defaultStart={[20, 20, 0]} defaultEnd={[30, 30, 0]} />} />
        </Canvas>
    )
}

export default CreepModel;