/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\scene.gltf 
Author: VIS-All-3D (https://sketchfab.com/VIS-All)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/office-plant-1-3c28dc89b31d43ed82dab16b33dbd182
Title: Office Plant 1
*/

import React, {forwardRef} from 'react'
import { useGLTF } from '@react-three/drei'

export const OfficePlantLong = forwardRef(function OfficePlantLong(props, ref) {
  const { nodes, materials } = useGLTF(`${process.env.NEXT_PUBLIC_BASE_PATH}/models/office_plant_long/scene.gltf`)
  return (
      <group ref={ref} {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.473}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.Object_4.geometry} material={materials.material} />
            <mesh geometry={nodes.Object_5.geometry} material={materials['Material.001']} />
            <mesh geometry={nodes.Object_6.geometry} material={materials.Green_Plant} />
            <mesh geometry={nodes.Object_7.geometry} material={materials['Material.002']} />
          </group>
        </group>
      </group>
  )
});

useGLTF.preload(`${process.env.NEXT_PUBLIC_BASE_PATH}/models/office_plant_long/scene.gltf`)
