import {ModalProps} from "@/components/shared/TaskModalComponent";
import React, {useRef} from "react";
import {Box, Button} from "@mui/material";
import {DetectiveOfficeWithWindow} from "@/components/DetectiveOfficeWithWindow";
import {WORLD_COORDINATE} from "@/app/contants";

type PropsDetectiveOfficeWithWindow = {
    triggerModal: (modalProps: ModalProps) => void;
};
export const DetectiveOfficeWithWindowComponent: React.FC<PropsDetectiveOfficeWithWindow> = (props: PropsDetectiveOfficeWithWindow) => {
    const {triggerModal} = props;
    const frontCardRef = useRef<HTMLButtonElement>();
    const backCardRef = useRef<HTMLButtonElement>();

    const handleFlip = () => {
        if (!frontCardRef.current || !backCardRef.current) return;
        const frontCard = frontCardRef.current;
        const backCard = backCardRef.current;
        if (frontCard.style.display === "none") {
            frontCard.style.display = "block";
            backCard.style.display = "none";
            return;
        }
        frontCard.style.display = "none";
        backCard.style.display = "block";
    };

    const modalContent = (
        <Box component={"div"} sx={{ display: "grid", gridGap: "var(--space-4)" }}>
            <Box
                ref={frontCardRef}
                component={"img"}
                src={"/rooms/room1/double-paper-front.png"}
                alt={"Karte Vorderseite"}
                sx={{
                    maxWidth: "400px",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "var(--space-3)",
                }}
                onClick={handleFlip}
            />
            <Box
                ref={backCardRef}
                component={"img"}
                src={"/rooms/room1/double-paper-back.png"}
                alt={"Karte Rückseite"}
                sx={{
                    display: "none",
                    maxWidth: "400px",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "var(--space-3)",
                }}
                onClick={handleFlip}
            />
            <Button
                variant={"plain"}
                onClick={handleFlip}
                sx={{
                    justifySelf: "center",
                }}
            >
                Umdrehen
            </Button>
        </Box>
    );

    return (
        <DetectiveOfficeWithWindow
            // @ts-ignore
            scale={0.6}
            //rotation-y={Math.PI / 2}
            position={[15, WORLD_COORDINATE[1], -7]}
            onDoublePaperClick={() => triggerModal({
                    open: true,
                    title: "Hinweis",
                    content: modalContent,
                }
            )}
        />
    );
};
