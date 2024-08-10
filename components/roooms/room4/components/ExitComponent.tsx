import React, {Ref, useEffect, useRef, useState} from "react";
import {Aufgabe} from "@/api/aufgabe";
import {useRouter} from "next/navigation";
import {Mesh} from "three";
import {useGlobalStore} from "@/store/useGlobalStore";
import {BookCupboard} from "@/components/BookCupboard";
import {ExitDoorAttachment} from "@/components/ExitDoorAttachment";
import {Html} from "@react-three/drei";
import {AnswerInputModalComponent} from "@/components/shared/AnswerInputModalComponent";
import {WORLD_COORDINATE} from "@/app/contants";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box, Button} from "@mui/material";
import {Stack} from "@mui/joy";

type Props = {
    aufgabe: Aufgabe;
    nextRoomId?: string | undefined;
};
const ExitComponent: React.FC<Props> = (props) => {
    const { aufgabe, nextRoomId } = props;
    const router = useRouter();
    const exitDoorAttachmentRef = useRef<Mesh>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const setListenToKeyboardKeyPress = useGlobalStore((state) => state.setListenToKeyboardKeyPress);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);

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
    };

    const handleButtonClick = () => {
        setIsAnswerCorrect(false);
        navigateToNextRoom();
    };

    const correctAnswerModalContent = (
        <Stack component={"div"} spacing={4}>
            <Box
                component={"img"}
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/rooms/room4/computer-displaying-key.png`}
                sx={{
                    width: "95%",
                    objectFit: "cover",
                    filter: "drop-shadow(1px 10px 6px rgba(0.05833333358168602,0.05833333358168602,0.05833333358168602,0.550000011920929))",
                    m: "var(--space-2)",
                }}
            />
            <Button onClick={handleButtonClick}>
                Weiter
            </Button>
        </Stack>
    );

    return (
        <>
            <BookCupboard
                rotation-y={-Math.PI / 2}
                // @ts-ignore
                setAnimationActions={() => {}}
                scale={1}
                position={[9.4, WORLD_COORDINATE[1], 0]}
                onClick={() => setIsOpen(true)}
            />
            <ExitDoorAttachment
                ref={exitDoorAttachmentRef as Ref<Mesh>}
                scale={0.15}
                position-x={9.9}
                position-y={0.9}
                rotation-y={-Math.PI / 2}
                // @ts-ignore
                onClick={() => setIsOpen(true)}
                attachmentColor={"white"}
                groupProps={{
                    position: [0, 0.5, 0],
                }}
            />
            <Html>
                <AnswerInputModalComponent
                    open={isOpen}
                    title="Wie läutet das Lösungswort ?"
                    aufgabeId={aufgabe.id}
                    answer={aufgabe.loesungen[0].wert}
                    successMessage={aufgabe.erfolgMeldung}
                    failureMessage={aufgabe.fehlschlagMeldung}
                    onSuccess={() => setIsAnswerCorrect(true)}
                    onClose={() => setIsOpen(false)}
                    modalDialogProps={{
                        maxWidth: "550px",
                        minWidth: "550px",
                    }}
                />
                {isAnswerCorrect ?
                    <TaskModalComponent
                        open={isAnswerCorrect}
                        content={correctAnswerModalContent}
                        modalDialogProps={{
                            maxWidth: "500px",
                        }}
                    />
                    : null
                }
            </Html>
        </>
    );
}

export default ExitComponent;
