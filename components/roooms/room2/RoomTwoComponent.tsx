import React from 'react';
import {useTexture} from "@/hooks/useTexture";
import {WORLD_COORDINATE} from "@/app/contants";
import {GroundComponent} from "@/components/GroundComponent";
import {RoomProps} from "@/components/roooms/RoomProps";
import {JuliusCaesarComponent} from "@/components/roooms/room2/components/JuliusCaesarComponent";
import {ExitDoorComponent} from "@/components/roooms/ExitDoorComponent";
import {DoorToPreviousRoomComponent} from "@/components/roooms/DoorToPreviousRoomComponent";
import {CupBoardComponent} from "@/components/roooms/room2/components/CupBoardComponent";
import {WallPapersComponent} from "@/components/roooms/room2/components/WallPapersComponent";
import {OfficeWithFotoFrameComponent} from "@/components/roooms/room2/components/OfficeWithFotoFrameComponent";
import {InstancedWallModelComponent} from "@/components/roooms/InstancedWallModelComponent";
import {OfficePlantLong} from "@/components/OfficePlantLong";

const RoomTwoComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { texture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/wooden_floor_with_smooth_finish.jpg`);

    return (
        <>
            <InstancedWallModelComponent
                meshProps={{
                    scale: [1, 2, 1],
                    position: [0, WORLD_COORDINATE[1] * -3, 0],
                }}
                meshBasicMaterialProps={{
                    color: "grey",
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
            <OfficeWithFotoFrameComponent raum={raum} />
            <OfficePlantLong
                // @ts-ignore
                position={[0, WORLD_COORDINATE[1], -9]}
                scale={1.5}
            />
            <OfficePlantLong
                // @ts-ignore
                position={[2, WORLD_COORDINATE[1], -9]}
                scale={1.5}
            />
            <OfficePlantLong
                // @ts-ignore
                position={[4, WORLD_COORDINATE[1], -9]}
                scale={1.5}
            />
            <CupBoardComponent raum={raum} />
            <WallPapersComponent raum={raum} />
            <JuliusCaesarComponent
                raum={raum}
                scale={1}
                position={[-3, 0.5, -9.95]}
            />
            <ExitDoorComponent
                aufgabe={raum.aufgaben[0]}
                nextRoomId={"20000000-0000-0000-0000-000000000003"}
                doorProps={{
                    position: [9.98, WORLD_COORDINATE[1], 0],
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
                    map: texture,
                }}
            />
        </>
    );
};

export default RoomTwoComponent;
