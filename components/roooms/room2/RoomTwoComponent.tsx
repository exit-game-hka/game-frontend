import React from 'react';
import {useFloor} from "@/hooks/useFloor";
import {WORLD_COORDINATE} from "@/app/contants";
import {GroundComponent} from "@/components/GroundComponent";
import {RoomProps} from "@/components/roooms/RoomProps";

export const RoomTwoComponent: React.FC<RoomProps> = (props) => {
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


