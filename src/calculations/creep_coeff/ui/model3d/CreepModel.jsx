import React, { useCallback, useMemo, useRef, useState } from "react";
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';

import { Orbitter } from 'reactcomponents/three/core/Controls';

export function EndPoint({ position }) {
    return (
        <mesh position={position} onClick={e => console.log(e)}>
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

export function DimensionLine({ defaultStart, defaultEnd }) {
    const [start, setStart] = useState(defaultStart);
    const [end, setEnd] = useState(defaultEnd);
    const vertices = useMemo(() => [start, end].map(v => new THREE.Vector3(...v)), [start, end]);
    const update = useCallback(self => ((self.verticesNeedUpdate = true), self.computeBoundingSphere()), []);
    return (
        <>
            <line>
                <geometry attach="geometry" vertices={vertices} onUpdate={update} />
                <lineBasicMaterial attach="material" color="gray" />
            </line>
            <EndPoint position={start} />
            <EndPoint position={end} />
        </>
    );
}

const CreepModel = () => {
    const ref = useRef()

    const elementShape = new THREE.Shape();
    elementShape.moveTo(-10, -10);
    elementShape.lineTo(10, -10);
    elementShape.lineTo(10, 10);
    elementShape.lineTo(-10, 10);

    const extrudeSettings = { steps: 1, depth: 1, bevelEnabled: false };
    const elementGeometry = new THREE.ExtrudeGeometry(elementShape, extrudeSettings);
    const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 'gray' }), [])

    return (
        <Canvas>
            <mesh ref={ref} args={[elementGeometry]} material={material} />
            <DimensionLine defaultStart={[20, 20, 0]} defaultEnd={[30, 30, 0]} />} />
            <Orbitter />
        </Canvas>
    )
}

export default CreepModel;