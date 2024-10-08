"use client";
import React, {Ref, useEffect, useRef, useState} from 'react';
import {ExitDoor} from "@/components/ExitDoor";
import {ExitDoorAttachment} from "@/components/ExitDoorAttachment";
import {Mesh} from "three";
import {Html, Text} from "@react-three/drei";
import {AnswerInputModalComponent} from "@/components/shared/AnswerInputModalComponent";
import {useRouter} from "next/navigation";
import {Aufgabe} from "@/api/aufgabe";
import {GroupProps} from "@react-three/fiber";
import {useGlobalStore} from "@/store/useGlobalStore";
import {Stack, Typography} from "@mui/joy";
import {WORLD_COORDINATE} from "@/app/contants";

type Props = {
    aufgabe: Aufgabe;
    nextRoomId?: string | undefined;
    doorProps: GroupProps;
};

export const ExitDoorComponent: React.FC<Props> = (props: Props) => {
    const { aufgabe, nextRoomId, doorProps } = props;
    const router = useRouter();
    const exitDoorAttachmentRef = useRef<Mesh>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const setListenToKeyboardKeyPress = useGlobalStore((state) => state.setListenToKeyboardKeyPress);

    useEffect(() => {
        if (isOpen) {
            setListenToKeyboardKeyPress(false);
            return;
        }
        setListenToKeyboardKeyPress(true);
    }, [isOpen]);

    const navigateToNextRoom = () => {
        if (!nextRoomId) {
            router.push("/outro");
            return;
        }
        router.push(`/game-scene/rooms/${nextRoomId}`);
    }

    useEffect(() => {
        if (!doorProps || !doorProps.position || !exitDoorAttachmentRef.current) return;

        const [x] = doorProps.position as [x: number, y: number, z: number];

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
                attachmentColor={"white"}
                onClick={() => {}}
            />
            <Html>
                <AnswerInputModalComponent
                    open={isOpen}
                    title="Wie läutet das Lösungswort ?"
                    aufgabeId={aufgabe.id}
                    answer={aufgabe.loesungen[0].wert}
                    successMessage={aufgabe.erfolgMeldung}
                    failureMessage={aufgabe.fehlschlagMeldung}
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

