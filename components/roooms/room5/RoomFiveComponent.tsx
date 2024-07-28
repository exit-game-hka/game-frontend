import React from 'react';
import {useTexture} from "@/hooks/useTexture";
import {GroundComponent} from "@/components/GroundComponent";
import {WORLD_COORDINATE} from "@/app/contants";
import {RoomProps} from "@/components/roooms/RoomProps";
import {ExitDoorComponent} from "@/components/roooms/ExitDoorComponent";
import {DoorToPreviousRoomComponent} from "@/components/roooms/DoorToPreviousRoomComponent";
import {DetectiveOfficeComponent} from "@/components/roooms/room5/components/DetectiveOfficeComponent";
import {OldStyleOfficeComponent} from "@/components/roooms/room5/components/OldStyleOfficeComponent";
import {OfficePlantLong} from "@/components/OfficePlantLong";
import {OfficePlantComponent} from "@/components/roooms/room5/components/OfficePlantComponent";
import {InstancedWallModelComponent} from "@/components/roooms/InstancedWallModelComponent";
import JuliusCaesarWithNumberComponent from "@/components/roooms/room5/components/JuliusCaesarWithNumberComponent";

const RoomFiveComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { texture: floorTexture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/floor-with-black-and-white-tile.jpg`, [60, 60]);

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
            <ExitDoorComponent
                aufgabe={raum.aufgaben[0]}
                nextRoomId={"20000000-0000-0000-0000-000000000006"}
                doorProps={{
                    position: [9.98, WORLD_COORDINATE[1], 0],
                }}
            />
            <DoorToPreviousRoomComponent
                doorProps={{
                    position: [-10, WORLD_COORDINATE[1], 0],
                }}
            />
            <DetectiveOfficeComponent raum={raum} />
            <OldStyleOfficeComponent raum={raum} />
            <OfficePlantLong
                // @ts-ignore
                position={[-4, WORLD_COORDINATE[1], -8]}
                scale={1.5}
            />
            <OfficePlantComponent raum={raum} />
            <JuliusCaesarWithNumberComponent
                raum={raum}
                // @ts-ignore
                position={[0, 1.5, 9.9]}
                rotation={[0, Math.PI, 0]}
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

export default RoomFiveComponent;
