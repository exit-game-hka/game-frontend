"use client";
import React, {Ref, useEffect, useRef, useState} from 'react';
import {ExitDoor} from "@/components/ExitDoor";
import {ExitDoorAttachment} from "@/public/models/exit_door_attachment/ExitDoorAttachment";
import {Mesh} from "three";
import {Html} from "@react-three/drei";
import {AnswerInputModalComponent} from "@/components/shared/AnswerInputModalComponent";
import {useRouter, useSearchParams} from "next/navigation";
import {Aufgabe} from "@/api/aufgabe";
import {GroupProps} from "@react-three/fiber";

type Props = {
    aufgabe: Aufgabe;
    nextRoomId: string;
    doorProps: GroupProps;
};

export const ExitDoorComponent: React.FC<Props> = (props: Props) => {
    const { aufgabe, nextRoomId, doorProps } = props;
    const params = useSearchParams();
    const router = useRouter();
    const exitDoorAttachmentRef = useRef<Mesh>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navigateToNextRoom = () => {
        router.push(`/game-scene/rooms/${nextRoomId}?${params?.toString()}`);
    }

    useEffect(() => {
        if (!doorProps || !doorProps.position || !exitDoorAttachmentRef.current) return;
        // @ts-ignore
        const [x] = doorProps.position;

        const xCoordinateOfAttachment = x - 0.13;
        exitDoorAttachmentRef.current.position.set(xCoordinateOfAttachment, -0.5, 0);
    }, [doorProps]);

    return (
        <>
            <ExitDoor
                rotation-y={-Math.PI / 2}
                // @ts-ignore
                setAnimationActions={() => {}}
                scale={1}
                onClick={() => setIsOpen(true)}
                {...doorProps}
            />
            <ExitDoorAttachment
                ref={exitDoorAttachmentRef as Ref<Mesh>}
                scale={0.15}
                rotation-y={-Math.PI / 2}
                // @ts-ignore
                onClick={() => setIsOpen(true)}
            />
            <Html>
                <AnswerInputModalComponent
                    open={isOpen}
                    title="Wie läutet das Lösungswort ?"
                    answer={aufgabe.loesungen[0].wert}
                    onSuccess={navigateToNextRoom}
                    onClose={() => setIsOpen(false)}
                    modalDialogProps={{
                        maxWidth: "550px",
                        minWidth: "550px",
                    }}
                />
            </Html>
        </>
    );
};

