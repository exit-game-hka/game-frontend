/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\scene.gltf 
Author: farhad.Guli (https://sketchfab.com/farhad.Guli)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/tree-7016d1d32fe748f0a8b3f5eb39374bc4
Title: Tree
*/

import React, {forwardRef, useRef} from 'react'
import { useGLTF } from '@react-three/drei'

// eslint-disable-next-line react/display-name
export const Tree = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/models/tree/scene.gltf")
  return (
      <group ref={ref} {...props}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Object_3.geometry} material={materials.formica_cinza} />
          <mesh geometry={nodes.Object_4.geometry} material={materials.material} />
          <mesh geometry={nodes.Object_5.geometry} material={materials.material} />
          <mesh geometry={nodes.Object_6.geometry} material={materials.material} />
          <mesh geometry={nodes.Object_7.geometry} material={materials.material} />
          <mesh geometry={nodes.Object_8.geometry} material={materials.material} />
          <mesh geometry={nodes.Object_9.geometry} material={materials.material} />
          <mesh geometry={nodes.Object_10.geometry} material={materials.Vegetation_Bark_Maple_1} />
        </group>
      </group>
  )
})

useGLTF.preload("/models/tree/scene.gltf")