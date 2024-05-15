import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import React, {useRef, useState} from "react";
import {Box, Button} from "@mui/material";
import {DetectiveOfficeWithWindow} from "@/components/DetectiveOfficeWithWindow";
import {WORLD_COORDINATE} from "@/app/contants";
import {Typography} from "@mui/joy";
import {Html} from "@react-three/drei";

export const DetectiveOfficeWithWindowComponent: React.FC = () => {
    const frontCardRef = useRef<HTMLButtonElement>();
    const backCardRef = useRef<HTMLButtonElement>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <Box
            component={"div"}
            sx={{
                display: "grid",
                gridGap: "var(--space-4)",
                alignItems: "start",
                alignContent: "start",
            }}
        >
            <Box
                ref={frontCardRef}
                component={"div"}
                sx={{
                    borderRadius: "var(--space-3)",
                    background: "url('/rooms/room1/double-paper-front-bg.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    p: "calc(var(--space-15) * 2) var(--space-6) var(--space-6) var(--space-6)",
                    "&>*": {
                        color: "var(--color-black)",
                    },
                }}
                onClick={handleFlip}
            >
                <Typography fontSize={"title-sm"} fontWeight={700}>ALAN TURING</Typography>
                <Typography component={"ul"} fontSize={"title-sm"} fontWeight={700}>
                    <li>
                        18 GEBOREN 1912 IN LONDON
                    </li>
                    <li>
                        1 INTERESSEN: RELATIVITAETSTHEORIE, QUANTENMECHANIK
                    </li>
                    <li>
                        1 INTERESSEN: RELATIVITAETSTHEORIE, QUANTENMECHANIK
                    </li>
                    <li>
                        5 HOBBIES: MATHEMATIKWETTBEWERBE
                    </li>
                    <li>
                        20 STUDIUM: MATHEMATIK @ KING’S COLLEGE, LONDON
                    </li>
                    <li>
                        19 PROMOTION: PRINCETON UNIVERSITY
                    </li>
                    <li>
                        5 BERUF: HACKER IN BLETCHLEY PARK
                    </li>
                    <li>
                        12 AUFGABE: ENIGMA DER DEUTSCHEN WEHRMACHT ENTSCHLUESSELN
                    </li>
                </Typography>
            </Box>
            <Box
                ref={backCardRef}
                component={"div"}
                sx={{
                    display: "none",
                    width: "100%",
                    minWidth: "350px",
                    objectFit: "cover",
                    borderRadius: "var(--space-3)",
                    background: "url('/rooms/room1/double-paper-bg.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    "& *": {
                        color: "var(--color-black)",
                    },
                }}
                onClick={handleFlip}
            >
                <Typography
                    component={"div"}
                    fontWeight={700}
                    sx={{
                        display: "grid",
                        justifyContent: "center",
                        justifyItems: "center",
                        fontSize: "var(--font-small)",
                    }}
                >
                    <div>A</div>
                    <div>B</div>
                    <div>C</div>
                    <div>D</div>
                    <div>E</div>
                    <div>F</div>
                    <div>G</div>
                    <div>H</div>
                    <div>I</div>
                    <div>J</div>
                    <div>K</div>
                    <div>L</div>
                    <div>M</div>
                    <div>N</div>
                    <div>O</div>
                    <div>P</div>
                    <div>Q</div>
                    <div>R</div>
                    <div>S</div>
                    <div>T</div>
                    <div>U</div>
                    <div>V</div>
                    <div>W</div>
                    <div>X</div>
                    <div>Y</div>
                    <div>Z</div>
                </Typography>

            </Box>
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
        <>
            <DetectiveOfficeWithWindow
                // @ts-ignore
                scale={0.6}
                //rotation-y={Math.PI / 2}
                position={[15, WORLD_COORDINATE[1], -7]}
                onDoublePaperClick={() => setIsOpen(true)}
            />
            <Html>
                <TaskModalComponent
                    open={isOpen}
                    title="Hinweis"
                    content={modalContent}
                    onClose={() => setIsOpen(false)}
                    modalDialogProps={{
                        maxWidth: "550px",
                    }}
                />
            </Html>
        </>
    );
};
