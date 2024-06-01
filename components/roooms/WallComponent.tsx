import React from 'react';
import {ThreeElements} from "@react-three/fiber";
import {DoubleSide} from "three";

type Props = {
    meshProps: ThreeElements["mesh"];
    meshBasicMaterialProps?: ThreeElements["meshBasicMaterial"];
};

export const WallComponent: React.FC<Props> = (props) => {
    const { meshProps, meshBasicMaterialProps } = props;
    return (
        <mesh
            {...meshProps}
            castShadow={false}
        >
            <planeGeometry args={[20, 4]}  />
            <meshBasicMaterial
                side={DoubleSide}
                {...meshBasicMaterialProps}
            />
        </mesh>
    );
};
