import React, {ReactNode, useMemo, useState} from "react";
import {RoomOneComponent} from "@/components/roooms/RoomOneComponent";
import {QuestionBoxComponent} from "@/components/QuestionBoxComponent";
import {Raum} from "@/api/raum";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {useLoader} from "@react-three/fiber";
import {WORLD_COORDINATE} from "@/app/contants";
import {GroundComponent} from "@/components/GroundComponent";
import {LinearMipMapLinearFilter, NearestFilter, RepeatWrapping, TextureLoader} from "three";

type Props = {
    room: Raum
}
export const RoomManagerComponent: React.FC<Props> = (props: Props) => {
    const { room } = props;
    const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

    const floorTexture = useLoader(TextureLoader, "/wooden-floor.png");

    floorTexture.magFilter = NearestFilter;
    floorTexture.minFilter = LinearMipMapLinearFilter;
    floorTexture.wrapS = RepeatWrapping;
    floorTexture.wrapT = RepeatWrapping;
    floorTexture.flipY = false;
    floorTexture.repeat.set(50, 50);

    const computedRoom = useMemo((): ReactNode => {
        switch (room.name) {
            case "Raum 1": return <RoomOneComponent />
            default: return <RoomOneComponent />
        }
    }, [room]);

    return (
        <>
            {computedRoom}
            {/*<QuestionBoxComponent onClick={() => setShowTaskModal(true)} />*/}
            <Html>
                <TaskModalComponent
                    room={room}
                    open={showTaskModal}
                    close={() => setShowTaskModal(false)}
                />
            </Html>
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

//*********************************************************************************************************************
// IMPORTANT !!!: DO NOT DELETE
//*********************************************************************************************************************
// Legal mentions and textures Authors:

// "Old tile wooden floor texture"
// (https://skfb.ly/oPEzK) by Tijerín Art Studio is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

