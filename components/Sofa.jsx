/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\scene.gltf 
Author: afernandezdelara (https://sketchfab.com/afernandezdelara)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/sofa-web-0fe3264cdfa8482a83830450d05ae1f1
Title: Sofa Web
*/

import React, {forwardRef} from 'react'
import { useGLTF } from '@react-three/drei'

export const Sofa = forwardRef(function Sofa(props, ref) {
  const { nodes, materials } = useGLTF(`${process.env.NEXT_PUBLIC_BASE_PATH}/models/sofa/scene.gltf`)
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.pasted__sofabuttons_pasted__buttonsmat1_0.geometry} material={materials.pasted__buttonsmat1} scale={5} />
      <mesh geometry={nodes.pasted__sofalegs_pasted__sofalegsShape_bakedmtl2_0.geometry} material={materials.pasted__sofalegsShape_bakedmtl2} scale={5} />
      <mesh geometry={nodes.pasted__sodametals_pasted__coopermat1_0.geometry} material={materials.pasted__coopermat1} position={[-0.084, 0, -44.043]} rotation={[-Math.PI / 2, 0, 0]} scale={0.5} />
      <mesh geometry={nodes.pasted__sofabody2_pasted__sofabody2Shape_bakedmtl2_0.geometry} material={materials.pasted__sofabody2Shape_bakedmtl2} />
    </group>
  )
});

useGLTF.preload(`${process.env.NEXT_PUBLIC_BASE_PATH}/models/sofa/scene.gltf`)