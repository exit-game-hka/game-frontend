/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\scene.gltf 
Author: ahmagh2e (https://sketchfab.com/ahmagh2e)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/carpet-e261ea97a64b48719c4d40009efd9ee1
Title: carpet
*/

import React, {forwardRef} from 'react'
import { useGLTF } from '@react-three/drei'

export const Carpet = forwardRef(function Carpet(props, ref) {
  const { nodes, materials } = useGLTF(`${process.env.NEXT_PUBLIC_BASE_PATH}/models/carpet/scene.gltf`)
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.Mat_1} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
});

useGLTF.preload(`${process.env.NEXT_PUBLIC_BASE_PATH}/models/carpet/scene.gltf`)
