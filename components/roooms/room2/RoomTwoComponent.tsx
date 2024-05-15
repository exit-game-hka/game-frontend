import React from 'react';
import {useFloor} from "@/hooks/useFloor";
import {WORLD_COORDINATE} from "@/app/contants";
import {GroundComponent} from "@/components/GroundComponent";
import {RoomProps} from "@/components/roooms/RoomProps";
import {OfficeWithFotoFrame} from "@/components/OfficeWithFotoFrame";
import {WallComponent} from "@/components/roooms/room2/components/WallComponent";
import {OfficePlantLong} from "@/components/OfficePlantLong";
import {WallPictures} from "@/public/models/wall_pictures/WallPictures";
import {JuliusCaesarComponent} from "@/components/roooms/room2/components/JuliusCaesarComponent";
import {ExitDoorComponent} from "@/components/roooms/ExitDoorComponent";
import {DoorToPreviousRoomComponent} from "@/components/roooms/DoorToPreviousRoomComponent";
import {CupBoardComponent} from "@/components/roooms/room2/components/CupBoardComponent";
import {WallPapersComponent} from "@/components/roooms/room2/components/WallPapersComponent";
import {OfficeWithFotoFrameComponent} from "@/components/roooms/room2/components/OfficeWithFotoFrameComponent";

export const RoomTwoComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { texture } = useFloor("/wooden_floor_with_smooth_finish.png");

    const plantsCoordinates = [
        [0, WORLD_COORDINATE[1], -9],
        [2, WORLD_COORDINATE[1], -9],
        [4, WORLD_COORDINATE[1], -9],
        [6, WORLD_COORDINATE[1], -9],
        [8, WORLD_COORDINATE[1], -9],
    ];

    return (
        <>
            {/* Front wall */}
            <WallComponent
                position={[0, 0, -10]}
            />
            {/* Left wall */}
            <WallComponent
                rotation-y={Math.PI / 2}
                position={[-10, 0, 0]}
            />
            {/* Right wall */}
            <WallComponent
                rotation-y={Math.PI / 2}
                position={[10, 0, 0]}
            />
            {/* Back wall */}
            <WallComponent
                position={[0, 0, 10]}
            />

            <OfficeWithFotoFrameComponent />


            {plantsCoordinates.map((c, index) =>
                <OfficePlantLong
                    key={index}
                    // @ts-ignore
                    position={c}
                    scale={1.5}
                />
            )}

            <CupBoardComponent />

            <WallPapersComponent />

            <JuliusCaesarComponent
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
                    //wireframe: true
                }}
            />
        </>
    );
};


