/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\scene.gltf 
*/

import React, {forwardRef} from 'react'
import { useGLTF } from '@react-three/drei'

export const OfficeWithFotoFrame = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/models/office-with-foto-frame/scene.gltf")
  return (
      <group ref={ref} {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.049}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
                geometry={nodes.directionalLight3_black_0.geometry}
                material={materials.black}
            />
            <mesh geometry={nodes.directionalLight3_dark_wood_0.geometry} material={materials.material_0} />
            <mesh geometry={nodes.directionalLight3_glass_0.geometry} material={materials.glass} />
            <mesh
                geometry={nodes.directionalLight3_grey_wood_0.geometry}
                material={materials.grey_wood}
                onClick={props.onClickMonitor}
            />
            <mesh geometry={nodes.directionalLight3_lambert1_0.geometry} material={materials.lambert1} />
            <mesh geometry={nodes.directionalLight3_light_wood_0.geometry} material={materials.light_wood} />
            <mesh geometry={nodes.directionalLight3_metall_0.geometry} material={materials.metall} />
            <mesh geometry={nodes.directionalLight3_switch_button_0.geometry} material={materials.switch_button} />
            <mesh geometry={nodes.directionalLight3_white_0.geometry} material={materials.white} />
          </group>
        </group>
      </group>
  )
})

useGLTF.preload("/models/office-with-foto-frame/scene.gltf")