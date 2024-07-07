"use client";
import React from "react";
import {ThreeElements} from "@react-three/fiber";
import {WORLD_HEIGHT, WORLD_WIDTH} from "@/app/contants";
import {RigidBody} from "@react-three/rapier";

type Props = ThreeElements["mesh"] & {
    meshMaterialProps?: ThreeElements["meshBasicMaterial"]
};

export const GroundComponent: React.FC<Props> = (props: Props) => {
    const { meshMaterialProps, ...rest } = props;

    return (
        <RigidBody
            type={"fixed"}
            friction={1}
            colliders="hull"
        >
            <mesh
                {...rest}
                castShadow={false}
                rotation-x={-Math.PI / 2}
                dispose={null}
            >
                <planeGeometry args={[WORLD_WIDTH, WORLD_HEIGHT, 10, 10]}/>
                <meshBasicMaterial {...meshMaterialProps} />
            </mesh>
        </RigidBody>
    );
};
