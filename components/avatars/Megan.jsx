/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 ./scene.gltf 
*/

import React, {useEffect, useRef} from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import {forwardRef} from "react";

export const Megan = forwardRef(function Megan(props, ref) {
      const group = useRef()
      const { nodes, materials, animations } = useGLTF(`${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/megan/scene.gltf`)
      const { actions } = useAnimations(animations, group)

      useEffect(() => {
        props.setAnimationActions(actions);
      }, [actions]);

      return (
          <group ref={group} {...props} dispose={null}>
            <group name="Scene" ref={ref}>
              <group name="Armature003" rotation={[Math.PI / 2, 0, Math.PI]} scale={0.011}>
                <primitive object={nodes.mixamorig2Hips} />
                <skinnedMesh name="Ch22_Body" geometry={nodes.Ch22_Body.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Body.skeleton} />
                <skinnedMesh name="Ch22_Eyelashes" geometry={nodes.Ch22_Eyelashes.geometry} material={materials.Ch22_hair} skeleton={nodes.Ch22_Eyelashes.skeleton} />
                <skinnedMesh name="Ch22_Hair" geometry={nodes.Ch22_Hair.geometry} material={materials.Ch22_hair} skeleton={nodes.Ch22_Hair.skeleton} />
                <skinnedMesh name="Ch22_Pants" geometry={nodes.Ch22_Pants.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Pants.skeleton} />
                <skinnedMesh name="Ch22_Shirt" geometry={nodes.Ch22_Shirt.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Shirt.skeleton} />
                <skinnedMesh name="Ch22_Sneakers" geometry={nodes.Ch22_Sneakers.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Sneakers.skeleton} />
              </group>
            </group>
          </group>
      )
    }
)
useGLTF.preload(`${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/megan/scene.gltf`)
