import React from 'react';
import {ThreeElements} from "@react-three/fiber";
import {DoubleSide} from "three";

type Props = ThreeElements["mesh"];

export const WallComponent: React.FC<Props> = (props) => {
    return (
        <mesh
            {...props}
            castShadow={false}
            receiveShadow={true}
        >
            <planeGeometry args={[20, 4]}  />
            <meshBasicMaterial color={"grey"} side={DoubleSide} />
        </mesh>
    );
};

