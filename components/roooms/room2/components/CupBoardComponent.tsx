import React, {useState} from 'react';
import {WORLD_COORDINATE} from "@/app/contants";
import {BookCupboard} from "@/public/models/book_cupboard/BookCupboard";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box, Typography} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {ThreeEvent} from "@react-three/fiber";
import {useGlobalStore} from "@/store/useGlobalStore";
import {InteraktionDto} from "@/api/interaktion";

export const CupBoardComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContent = (
        <Box
            component="div"
            sx={{
                borderRadius: "var(--space-3)",
                background: "url('/rooms/ancien_paper.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                p: "var(--space-6) var(--space-4)",
                "& *": {
                    color: "var(--color-black)",
                },
            }}
        >
            <Stack
                spacing={"var(--space-3)"}
                sx={{
                    "& p": {
                        color: "var(--color-black)",
                    },
                }}
            >
                <Typography>
                    DAS WORT KRYPTOGRAPHIE KOMMT AUS DEM
                    GRIECHISCHEN UND BESTEHT AUS DEN WORTEN
                    <b> KRYPTOS</b> (VERSTECKEN) UND <b> GRAPHEIN</b> (SCHREIBEN).
                </Typography>
                <Typography>
                    KRYPTOGRAPHIE = DIE KUNST CODES ZU SCHREIBEN
                    UND ZU DEKODIEREN.
                </Typography>
                <Typography>
                    DAMIT VERBUNDEN SIND DIE KONZEPTE DER
                    VERSCHLUESSELUNG UND DER ENTSCHLUESSELUNG.
                    UMGESETZT WIRD DIES MIT HILFE MATHEMATISCHER
                    MECHANISMEN.
                </Typography>
                <Typography>
                    DIESE ERLAUBEN DAS UMSETZEN VON
                    INFORMATIONSSICHERHEIT.
                </Typography>
                <Box component={"div"}>
                    WICHTIGE ASPEKTE DER INFORMATIONSSICHERHEIT
                    SIND:
                    <Box component="ul">
                        <li>VERTRAULICHKEIT UNSERER DATEN</li>
                        <li>DATEN INTEGRITAET</li>
                        <li>AUTHENTIFIZIERUNG</li>
                        <li>UHJODLPZIHYRLP</li>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );

    const handleClickBookCupboard = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Buchseite über Kryptographie angeklickt",
        };
        await createInteraktion(interactionDto);
    };

    return (
        <>
            <BookCupboard
                // @ts-ignore
                scale={0.7}
                rotation-y={Math.PI / 2}
                position={[-9.55, WORLD_COORDINATE[1], -4]}
                onClick={handleClickBookCupboard}
            />
            <Html>
                <TaskModalComponent
                    open={isOpen}
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

