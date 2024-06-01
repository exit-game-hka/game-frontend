import React from 'react';
import {useTexture} from "@/hooks/useTexture";
import {GroundComponent} from "@/components/GroundComponent";
import {WORLD_COORDINATE} from "@/app/contants";
import {RoomProps} from "@/components/roooms/RoomProps";
import {DoorToPreviousRoomComponent} from "@/components/roooms/DoorToPreviousRoomComponent";
import {SimpleSafeBoxComponent} from "@/components/roooms/room6/components/SimpleSafeBoxComponent";
import {WallPicturesComponent} from "@/components/roooms/room6/components/WallPicturesComponent";
import {CupboardWithGlassDoorsComponent} from "@/components/roooms/room6/components/CupboardWithGlassDoorsComponent";
import {Sofa} from "@/components/Sofa";
import {OfficePlantLong} from "@/components/OfficePlantLong";
import {Carpet} from "@/components/Carpet";
import {InstancedWallModelComponent} from "@/components/roooms/InstancedWallModelComponent";

const RoomSixComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { texture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/trefoil-floor.jpg`);
    return (
        <>
            <InstancedWallModelComponent
                meshProps={{
                    scale: [1, 2, 1],
                    position: [0, WORLD_COORDINATE[1] * -3, 0],
                }}
                meshBasicMaterialProps={{
                    color: "#8c8c8c",
                }}
                modelsProps={[
                    {
                        position: [0, WORLD_COORDINATE[1], -10],
                        rotation: [0, 0, 0],
                    },
                    {
                        position: [-10, WORLD_COORDINATE[1], 0],
                        rotation: [0, Math.PI / 2, 0],
                    },
                    {
                        position: [0, WORLD_COORDINATE[1], 10],
                        rotation: [0, 0, 0],
                    },
                    {
                        position: [10, WORLD_COORDINATE[1], 0],
                        rotation: [0, -Math.PI / 2, 0],
                    },
                ]}
            />
            <DoorToPreviousRoomComponent
                doorProps={{
                    position: [-10, WORLD_COORDINATE[1], 0],
                }}
            />
            <SimpleSafeBoxComponent raum={raum} />
            <WallPicturesComponent raum={raum} />
            <CupboardWithGlassDoorsComponent raum={raum} />
            <Sofa
                // @ts-ignore
                position={[-3.5, WORLD_COORDINATE[1], -8]}
                scale={0.004}
            />
            <OfficePlantLong
                // @ts-ignore
                position={[8.5, WORLD_COORDINATE[1], -5]}
                scale={1.5}
            />
            <OfficePlantLong
                // @ts-ignore
                position={[8.5, WORLD_COORDINATE[1], -4]}
                scale={1.5}
            />
            <Carpet
                // @ts-ignore
                position={[-3.5, WORLD_COORDINATE[1] + 0.01, -6]}
                rotation-y={Math.PI / 2}
                scale={0.04}
            />
            <GroundComponent
                position={WORLD_COORDINATE}
                meshMaterialProps={{
                    map: texture,
                }}
            />
        </>
    );
};

export default RoomSixComponent;
