"use client";
import React, {useRef, useState} from 'react';
import {ExitDoor} from "@/components/ExitDoor";
import {WORLD_COORDINATE} from "@/app/contants";
import {ExitDoorAttachment} from "@/public/models/exit_door_attachment/ExitDoorAttachment";
import {ModalProps} from "@/components/shared/TaskModalComponent";
import * as THREE from "three";
import {Html} from "@react-three/drei";
import useApplicationContext from "@/hooks/useApplicationContext";
import {AnswerInputModalComponent} from "@/components/shared/AnswerInputModalComponent";
import {useRouter, useSearchParams} from "next/navigation";

type Props = {
    triggerModal: (modalProps: ModalProps) => void;
};

export const ExitDoorComponent: React.FC<Props> = (props: Props) => {
    const {setModalProps: triggerModal} = useApplicationContext();
    const params = useSearchParams();
    const router = useRouter();
    const exitDoorRef = useRef<THREE.Object3D>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navigateToNextRoom = () => {
        router.push(`/game-scene/rooms/20000000-0000-0000-0000-000000000002?${params?.toString()}`);
    }

    return (
        <>
            <ExitDoor
                ref={exitDoorRef}
                rotation-y={-Math.PI / 2}
                // @ts-ignore
                position={[18, WORLD_COORDINATE[1], 0]}
                scale={1}
                setAnimationActions={() => {}}
                onClick={() => setIsOpen(true)}
            />
            <ExitDoorAttachment
                scale={0.15}
                rotation-y={-Math.PI / 2}
                position={[17.87, -0.5, 0]}
                onClick={() => setIsOpen(true)}
            />
            <Html>
                <AnswerInputModalComponent
                    open={isOpen}
                    title="Wie läutet das Lösungswort ?"
                    onSuccess={navigateToNextRoom}
                    onClose={() => setIsOpen(false)}
                />
            </Html>
        </>
    );
};

