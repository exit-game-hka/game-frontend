"use client";
import React, {Ref, useRef} from "react";
import * as THREE from "three";
import {BufferGeometry, Mesh, NormalBufferAttributes} from "three";
import {ThreeElements, useFrame} from "@react-three/fiber";

type Props = ThreeElements["mesh"];

type MeshRefType = Ref<Mesh<BufferGeometry<NormalBufferAttributes>>> | undefined

export const BoxComponent: React.FC<Props> = (props: Props) => {
    const meshRef = useRef<THREE.Mesh>();

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += delta * 0.2;
    });

    return (
        <mesh {...props} ref={meshRef as MeshRefType}>
            <boxGeometry args={[2, 2, 2]}/>
            <meshStandardMaterial/>
        </mesh>
    );
}