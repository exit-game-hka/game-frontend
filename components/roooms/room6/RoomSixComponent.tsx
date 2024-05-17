import React from 'react';
import {useTexture} from "@/hooks/useTexture";
import {GroundComponent} from "@/components/GroundComponent";
import {WORLD_COORDINATE} from "@/app/contants";
import {RoomProps} from "@/components/roooms/RoomProps";

export const RoomSixComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { texture } = useTexture("/trefoil-floor.png");
    return (
        <>
            <GroundComponent
                position={WORLD_COORDINATE}
                meshMaterialProps={{
                    map: texture,
                }}
            />
        </>
    );
};
