import React from 'react';
import {ThreeElements} from "@react-three/fiber";
import {WallComponent} from "@/components/roooms/WallComponent";

type Props = {
    frontWall: ThreeElements["mesh"];
    rightWall: ThreeElements["mesh"];
    backWall: ThreeElements["mesh"];
    leftWall: ThreeElements["mesh"];
    meshBasicMaterialProps?: ThreeElements["meshBasicMaterial"];
};

export const FourWallsComponent: React.FC<Props> = (props) => {
    const { frontWall, rightWall, backWall, leftWall, meshBasicMaterialProps } = props;

    return (
        <>
            <WallComponent meshProps={frontWall} meshBasicMaterialProps={meshBasicMaterialProps} />
            <WallComponent meshProps={rightWall} meshBasicMaterialProps={meshBasicMaterialProps} />
            <WallComponent meshProps={backWall} meshBasicMaterialProps={meshBasicMaterialProps} />
            <WallComponent meshProps={leftWall} meshBasicMaterialProps={meshBasicMaterialProps} />
        </>
    );
};
