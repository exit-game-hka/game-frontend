/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\scene.gltf 
*/
"use client";
import React, {forwardRef, useEffect, useRef} from "react"
import { useGLTF, useAnimations } from "@react-three/drei"

// eslint-disable-next-line react/display-name
export const Amy = forwardRef((props, ref) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(`${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/amy/scene.gltf`)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    props.setAnimationActions(actions);
  }, [actions]);

  return (
      <group ref={group} {...props} dispose={null}>
        <group name="Scene" ref={ref}>
          <group name="Armature" rotation={[Math.PI / 2, 0, Math.PI]} scale={0.014}>
            <primitive object={nodes.mixamorigHips} />
            <skinnedMesh name="Ch46" geometry={nodes.Ch46.geometry} material={materials.Ch46_body} skeleton={nodes.Ch46.skeleton} />
          </group>
        </group>
      </group>
  )
});

useGLTF.preload(`${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/amy/scene.gltf`)
