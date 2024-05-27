import React from 'react';
import {useTexture} from "@/hooks/useTexture";
import {GroundComponent} from "@/components/GroundComponent";
import {WORLD_COORDINATE} from "@/app/contants";
import {RoomProps} from "@/components/roooms/RoomProps";
import {FourWallsComponent} from "@/components/roooms/FourWallsComponent";
import {DoorToPreviousRoomComponent} from "@/components/roooms/DoorToPreviousRoomComponent";
import {SimpleSafeBoxComponent} from "@/components/roooms/room6/components/SimpleSafeBoxComponent";
import {WallPicturesComponent} from "@/components/roooms/room6/components/WallPicturesComponent";
import {CupboardWithGlassDoorsComponent} from "@/components/roooms/room6/components/CupboardWithGlassDoorsComponent";
import {Sofa} from "@/components/Sofa";
import {OfficePlantLong} from "@/components/OfficePlantLong";
import {Carpet} from "@/components/Carpet";

const RoomSixComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { texture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/trefoil-floor.png`);
    return (
        <>
            <FourWallsComponent
                frontWall={{ position: [0, 0, -10] }}
                leftWall={{
                    rotation: [0, Math.PI / 2, 0],
                    position: [-10, 0, 0],
                }}
                rightWall={{
                    rotation: [0, Math.PI / 2, 0],
                    position: [10, 0, 0],
                }}
                backWall={{ position: [0, 0, 10] }}
                meshBasicMaterialProps={{
                    //map: wallTexture,
                    color: "#8c8c8c",
                }}
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
            <OfficePlantLong
                // @ts-ignore
                position={[8.5, WORLD_COORDINATE[1], -3]}
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
