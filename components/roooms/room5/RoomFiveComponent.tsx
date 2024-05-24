import React from 'react';
import {useTexture} from "@/hooks/useTexture";
import {GroundComponent} from "@/components/GroundComponent";
import {WORLD_COORDINATE} from "@/app/contants";
import {RoomProps} from "@/components/roooms/RoomProps";
import {FourWallsComponent} from "@/components/roooms/FourWallsComponent";
import {ExitDoorComponent} from "@/components/roooms/ExitDoorComponent";
import {DoorToPreviousRoomComponent} from "@/components/roooms/DoorToPreviousRoomComponent";
import {DetectiveOfficeComponent} from "@/components/roooms/room5/components/DetectiveOfficeComponent";
import {OldStyleOfficeComponent} from "@/components/roooms/room5/components/OldStyleOfficeComponent";
import {OfficePlantLong} from "@/components/OfficePlantLong";
import {OfficePlantComponent} from "@/components/roooms/room5/components/OfficePlantComponent";
import {WallFotoFramesComponent} from "@/components/roooms/room5/components/WallFotoFramesComponent";

const RoomFiveComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { texture: floorTexture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/floor-with-black-and-white-tile.png`, [60, 60]);

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
            <WallFotoFramesComponent raum={raum} />
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
