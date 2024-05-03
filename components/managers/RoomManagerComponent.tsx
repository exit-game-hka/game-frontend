import React, {ReactNode, useMemo, useState} from "react";
import {RoomWithForestComponent} from "@/components/roooms/RoomWithForestComponent";
import {QuestionBoxComponent} from "@/components/QuestionBoxComponent";
import {Raum} from "@/api/raum";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";

type Props = {
    room: Raum
}
export const RoomManagerComponent: React.FC<Props> = (props: Props) => {
    const { room } = props;
    const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

    const computedRoom = useMemo((): ReactNode => {
        switch (room.name) {
            case "Raum 1": return <RoomWithForestComponent />
            default: return <RoomWithForestComponent />
        }
    }, [room]);

    return (
        <>
            {computedRoom}
            <QuestionBoxComponent onClick={() => setShowTaskModal(true)} />
            <Html>
                <TaskModalComponent
                    room={room}
                    open={showTaskModal}
                    close={() => setShowTaskModal(false)}
                />
            </Html>
        </>
    );
};