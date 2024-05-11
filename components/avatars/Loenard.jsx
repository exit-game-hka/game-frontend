/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\scene.gltf 
*/
"use client";
import React, {forwardRef, useEffect, useRef} from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export const Leonard = forwardRef((props, ref) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/avatars/leonard/scene.gltf")
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    props.setAnimationActions(actions);
  }, [actions]);

  return (
      <group ref={group} {...props} dispose={null}>
        <group name="Scene" ref={ref}>
          <group name="Armature" rotation={[Math.PI / 2, 0, Math.PI]} scale={0.011}>
            <primitive object={nodes.mixamorig9Hips} />
            <skinnedMesh name="Ch31_Body" geometry={nodes.Ch31_Body.geometry} material={materials.Ch31_body} skeleton={nodes.Ch31_Body.skeleton} />
            <skinnedMesh name="Ch31_Collar" geometry={nodes.Ch31_Collar.geometry} material={materials.Ch31_body} skeleton={nodes.Ch31_Collar.skeleton} />
            <skinnedMesh name="Ch31_Eyelashes" geometry={nodes.Ch31_Eyelashes.geometry} material={materials.Ch31_hair} skeleton={nodes.Ch31_Eyelashes.skeleton} />
            <skinnedMesh name="Ch31_Hair" geometry={nodes.Ch31_Hair.geometry} material={materials.Ch31_hair} skeleton={nodes.Ch31_Hair.skeleton} />
            <skinnedMesh name="Ch31_Pants" geometry={nodes.Ch31_Pants.geometry} material={materials.Ch31_body} skeleton={nodes.Ch31_Pants.skeleton} />
            <skinnedMesh name="Ch31_Shoes" geometry={nodes.Ch31_Shoes.geometry} material={materials.Ch31_body} skeleton={nodes.Ch31_Shoes.skeleton} />
            <skinnedMesh name="Ch31_Sweater" geometry={nodes.Ch31_Sweater.geometry} material={materials.Ch31_body} skeleton={nodes.Ch31_Sweater.skeleton} />
          </group>
        </group>
      </group>
  )
});

useGLTF.preload("/models/avatars/leonard/scene.gltf")
