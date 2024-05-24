"use client";
import React from "react";
import {ThreeElements} from "@react-three/fiber";
import {WORLD_HEIGHT, WORLD_WIDTH} from "@/app/contants";
import {DoubleSide} from "three";

type Props = ThreeElements["mesh"] & {
    meshMaterialProps?: ThreeElements["meshBasicMaterial"]
};

export const GroundComponent: React.FC<Props> = (props: Props) => {
    const { meshMaterialProps, ...rest } = props;
    return (
        <mesh
            {...rest}
            castShadow={false}
            receiveShadow={true}
            rotation-x={-Math.PI / 2}
        >
            <planeGeometry args={[WORLD_WIDTH, WORLD_HEIGHT, 10, 10]}  />
            <meshBasicMaterial {...meshMaterialProps} side={DoubleSide} />
        </mesh>
    );
};
