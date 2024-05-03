/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\girl.gltf 
*/

import React, {forwardRef, useEffect, useRef} from 'react'
import {useAnimations, useGLTF} from '@react-three/drei'

// eslint-disable-next-line react/display-name
export const Girl = forwardRef((props, ref) => {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF("/models/girl_with_actions/girl.gltf")
    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        props.setAnimationActions(actions);
    }, [actions]);

    return (
        <group ref={group} {...props}>
            <group name="Scene" ref={ref} castShadow={true}>
                <group name="Armature" rotation={[Math.PI / 2, 0, Math.PI]} scale={0.01}>
                    <primitive object={nodes.mixamorigHips} />
                    <skinnedMesh name="Ch03" geometry={nodes.Ch03.geometry} material={materials.Ch03_Body} skeleton={nodes.Ch03.skeleton} />
                </group>
            </group>
        </group>
    )
});

useGLTF.preload("/models/girl_with_actions/girl.gltf")
