/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 ./scene.gltf 
*/

import React, {forwardRef, useEffect, useRef} from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export const Maria = forwardRef(function Maria(props, ref) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(`${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/maria/scene.gltf`)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    props.setAnimationActions(actions);
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group ref={ref} name="Scene">
        <group name="Armature003" rotation={[Math.PI / 2, 0, Math.PI]} scale={0.011}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Maria_J_J_Ong" geometry={nodes.Maria_J_J_Ong.geometry} material={materials.MariaMat} skeleton={nodes.Maria_J_J_Ong.skeleton} />
          <skinnedMesh name="Maria_sword" geometry={nodes.Maria_sword.geometry} material={materials.MariaMat} skeleton={nodes.Maria_sword.skeleton} />
        </group>
      </group>
    </group>
  )
});

useGLTF.preload(`${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/maria/scene.gltf`)
