import React from 'react';
import {useTexture} from "@/hooks/useTexture";
import {GroundComponent} from "@/components/GroundComponent";
import {WORLD_COORDINATE} from "@/app/contants";
import {RoomProps} from "@/components/roooms/RoomProps";
import {ExitDoorComponent} from "@/components/roooms/ExitDoorComponent";
import {DoorToPreviousRoomComponent} from "@/components/roooms/DoorToPreviousRoomComponent";
import {ClockComponent} from "@/components/roooms/room4/components/ClockComponent";
import {OfficeWithBooksAndGlobeComponent} from "@/components/roooms/room4/components/OfficeWithBooksAndGlobeComponent";
import {TheologicalBookStackComponent} from "@/components/roooms/room4/components/TheologicalBookStackComponent";
import {SmallCupBoardComponent} from "@/components/roooms/room4/components/SmallCupBoardComponent";
import {InstancedWallModelComponent} from "@/components/roooms/InstancedWallModelComponent";

const RoomFourComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { texture: floorTexture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/floor-with-star-tile.jpg`);
    const { texture: wallTexture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/medieval-brick-wall.jpg`, [5, 4]);

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
            <ExitDoorComponent
                aufgabe={raum.aufgaben[0]}
                nextRoomId={"20000000-0000-0000-0000-000000000005"}
                doorProps={{
                    position: [9.98, WORLD_COORDINATE[1], 0],
                }}
            />
            <DoorToPreviousRoomComponent
                doorProps={{
                    position: [-10, WORLD_COORDINATE[1], 0],
                }}
            />
            <OfficeWithBooksAndGlobeComponent raum={raum} />
            <TheologicalBookStackComponent raum={raum} />
            <ClockComponent raum={raum} />
            <SmallCupBoardComponent raum={raum} />
            <GroundComponent
                position={WORLD_COORDINATE}
                meshMaterialProps={{
                    map: floorTexture,
                    //wireframe: true
                }}
            />
        </>
    );
};

export default RoomFourComponent;