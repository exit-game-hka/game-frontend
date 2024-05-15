import React from 'react';
import {useFloor} from "@/hooks/useFloor";
import {GroundComponent} from "@/components/GroundComponent";
import {WORLD_COORDINATE} from "@/app/contants";
import {RoomProps} from "@/components/roooms/RoomProps";

export const RoomFourComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { texture } = useFloor("/trefoil-floor.png");
    return (
        <>
            <GroundComponent
                position={WORLD_COORDINATE}
                meshMaterialProps={{
                    map: texture,
                    //wireframe: true
                }}
            />
        </>
    );
};

