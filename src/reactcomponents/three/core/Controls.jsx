import React, { useRef, useMemo } from "react";
import { extend, useThree, useFrame, createPortal, useCamera } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
extend({ OrbitControls })

export function Orbitter({ children }) {
  const controls = useRef()
  const { scene, camera, gl } = useThree()
  useFrame(() => controls.current.update())
  return (
    <orbitControls ref={controls} args={[camera, gl.domElement]} rotateSpeed={0.9} />
  )
}

export function Viewcube() {
  const { mouse, scene, gl, camera, size } = useThree()
  const virtualScene = useMemo(() => new THREE.Scene(), [])
  const virtualCam = useMemo(() => new THREE.OrthographicCamera(0, 0, 0, 0, 0.1, 1000), [])
  useMemo(() => {
    virtualCam.position.z = 200
    virtualCam.left = size.width / -2
    virtualCam.right = size.width / 2
    virtualCam.top = size.height / 2
    virtualCam.bottom = size.height / -2
    virtualCam.updateProjectionMatrix()
  }, [size])

  const ref = useRef()
  const matrix = new THREE.Matrix4()

  useFrame(() => {
    matrix.getInverse(camera.matrix)
    ref.current.quaternion.setFromRotationMatrix(matrix)
    gl.autoClear = true
    gl.render(scene, camera)
    gl.autoClear = false
    gl.clearDepth()
    gl.render(virtualScene, virtualCam)
  }, 1)

  return createPortal(
    <mesh
      ref={ref}
      raycast={useCamera(virtualCam)}
      position={[size.width / 2 - 80, size.height / 2 - 80, 0]}
      onPointerMove={e => console.log('ah')}>
      <meshBasicMaterial attach="material" color="gray" />
      <boxBufferGeometry attach="geometry" args={[60, 60, 60]} />
    </mesh>,
    virtualScene
  )
}

