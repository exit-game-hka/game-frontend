import React from 'react';
import {useFloor} from "@/hooks/useFloor";
import {WORLD_COORDINATE} from "@/app/contants";
import {GroundComponent} from "@/components/GroundComponent";

type Props = {};

export const RoomTwoComponent: React.FC<Props> = (props) => {
    const { texture } = useFloor("/wooden-floor.png");
    return (
        <GroundComponent
            position={WORLD_COORDINATE}
            meshMaterialProps={{
                map: texture,
                //wireframe: true
            }}
        />
    );
};

