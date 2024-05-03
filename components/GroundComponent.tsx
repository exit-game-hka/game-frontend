"use client";
import React from "react";
import {ThreeElements} from "@react-three/fiber";
import {WORLD_HEIGHT, WORLD_WIDTH} from "@/app/contants";

type Props = ThreeElements["mesh"];

export const GroundComponent: React.FC<Props> = (props: Props) => {
    return (
        <mesh
            {...props}
            castShadow={false}
            receiveShadow={true}
            rotation-x={-Math.PI / 2}
        >
            <planeGeometry args={[WORLD_WIDTH, WORLD_HEIGHT, 10, 10]}  />
            <meshBasicMaterial color={"#75e775"} />
        </mesh>
    );
}