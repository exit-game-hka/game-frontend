"use client";
import React from "react";
import {WORLD_COORDINATE} from "@/app/contants";
import {BookCupboard} from "@/components/BookCupboard";
import {useTexture} from "@/hooks/useTexture";
import {GroundComponent} from "@/components/GroundComponent";
import {
    DetectiveOfficeWithWindowComponent
} from "@/components/roooms/room1/components/DetectiveOfficeWithWindowComponent";
import {WhiteClockComponent} from "@/components/roooms/room1/components/WhiteClockComponent";
import {NumberComponent} from "@/components/roooms/room1/components/NumberComponent";
import {ExitDoorComponent} from "@/components/roooms/ExitDoorComponent";
import {RoomProps} from "@/components/roooms/RoomProps";
import {InstancedWallModelComponent} from "@/components/roooms/InstancedWallModelComponent";
import {OfficeTableWithLaptop} from "@/components/OfficeTableWithLaptop";
import {OldStyleOffice} from "@/components/OldStyleOffice";

const RoomOneComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { texture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/wooden-floor.jpg`);
    const { texture: wallTexture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/brick_wall_united_kingdom_neutral.jpg`, [3, 6]);

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
                nextRoomId={"20000000-0000-0000-0000-000000000002"}
                doorProps={{
                    position: [10, WORLD_COORDINATE[1], 0],
                }}
            />
            <OfficeTableWithLaptop
                // @ts-ignore
                scale={11}
                rotation-y={Math.PI / 2}
                position={[-7, WORLD_COORDINATE[1], -5]}
            />
            <BookCupboard
                // @ts-ignore
                scale={1}
                position={[-1, WORLD_COORDINATE[1], -9.4]}
            />
            <BookCupboard
                // @ts-ignore
                scale={1}
                rotation-y={Math.PI / 2}
                position={[-9.4, WORLD_COORDINATE[1], -1]}
            />
            <DetectiveOfficeWithWindowComponent raum={raum} />
            <WhiteClockComponent raum={raum} />
            <OldStyleOffice
                // @ts-ignore
                position={[7, WORLD_COORDINATE[1], 5]}
                rotation-y={-Math.PI}
                scale={0.25}
            />
            <NumberComponent raum={raum} />
            <GroundComponent
                position={WORLD_COORDINATE}
                meshMaterialProps={{
                    map: texture,
                }}
            />
        </>
    );
};

export default RoomOneComponent;
