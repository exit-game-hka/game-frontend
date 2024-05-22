import React from 'react';
import {useTexture} from "@/hooks/useTexture";
import {GroundComponent} from "@/components/GroundComponent";
import {WORLD_COORDINATE} from "@/app/contants";
import {RoomProps} from "@/components/roooms/RoomProps";
import {FourWallsComponent} from "@/components/roooms/FourWallsComponent";
import {ExitDoorComponent} from "@/components/roooms/ExitDoorComponent";
import {DoorToPreviousRoomComponent} from "@/components/roooms/DoorToPreviousRoomComponent";
import {ClockComponent} from "@/components/roooms/room4/components/ClockComponent";
import {OfficeWithBooksAndGlobeComponent} from "@/components/roooms/room4/components/OfficeWithBooksAndGlobeComponent";
import {TheologicalBookStackComponent} from "@/components/roooms/room4/components/TheologicalBookStackComponent";
import {SmallCupBoardComponent} from "@/components/roooms/room4/components/SmallCupBoardComponent";

const RoomFourComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { texture: floorTexture } = useTexture("/floor-with-star-tile.png");
    const { texture: wallTexture } = useTexture("/medieval-brick-wall.png", [5, 4]);

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
                    //color: "whitesmoke",
                    map: wallTexture,
                }}
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