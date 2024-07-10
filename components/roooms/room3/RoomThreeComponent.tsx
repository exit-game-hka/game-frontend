import React from 'react';
import {useTexture} from "@/hooks/useTexture";
import {WORLD_COORDINATE} from "@/app/contants";
import {GroundComponent} from "@/components/GroundComponent";
import {OfficeDeskWithFixPhone} from "@/components/OfficeDeskWithFixPhone";
import {WallPictures} from "@/components/WallPictures";
import {ExitDoorComponent} from "@/components/roooms/ExitDoorComponent";
import {DoorToPreviousRoomComponent} from "@/components/roooms/DoorToPreviousRoomComponent";
import {GreenBoardWithTableComponent} from "@/components/roooms/room3/components/GreenBoardWithTableComponent";
import {TableWithBooksAndGlobeComponent} from "@/components/roooms/room3/components/TableWithBooksAndGlobeComponent";
import {RoomProps} from "@/components/roooms/RoomProps";
import {InstancedWallModelComponent} from "@/components/roooms/InstancedWallModelComponent";

const RoomThreeComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { texture: floorTexture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/trefoil-floor.jpg`);
    const { texture: wallTexture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/hallway_wall.png`, [2, 3]);

    return (
        <>
            <InstancedWallModelComponent
                meshProps={{
                    scale: [1, 2, 1],
                    position: [0, WORLD_COORDINATE[1] * -3, 0],
                }}
                meshBasicMaterialProps={{
                    map: wallTexture,
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
            <GreenBoardWithTableComponent raum={raum} />
            <TableWithBooksAndGlobeComponent raum={raum} />
            <OfficeDeskWithFixPhone
                // @ts-ignore
                scale={1.3}
                rotation-y={Math.PI / 10}
                position={[7, WORLD_COORDINATE[1], 5]}
            />
            <WallPictures
                // @ts-ignore
                scale={1.5}
                rotation-y={-Math.PI / 2}
                position={[5, 1, -9.9]}
            />
            <ExitDoorComponent
                aufgabe={raum.aufgaben[0]}
                nextRoomId={"20000000-0000-0000-0000-000000000004"}
                doorProps={{
                    position: [10, WORLD_COORDINATE[1], 0],
                }}
            />
            <DoorToPreviousRoomComponent
                doorProps={{
                    position: [-10, WORLD_COORDINATE[1], 0],
                }}
            />
            <GroundComponent
                position={WORLD_COORDINATE}
                meshMaterialProps={{
                    map: floorTexture,
                }}
            />
        </>
    );
};

export default RoomThreeComponent;
