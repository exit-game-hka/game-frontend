import React, {useState} from 'react';
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {Card, Typography} from "@mui/material";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {BookCupboard} from "@/components/BookCupboard";
import {WORLD_COORDINATE} from "@/app/contants";

export const CupboardWithGlassDoorsComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContent = (
        <Card
            sx={{
                background: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/rooms/ancien_paper.png')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "inherit",
                "& p": {
                    color: "var(--color-black)",
                },
            }}
        >
            <Typography
                component={"p"}
                level={"title-lg"}
                sx={{
                    fontWeight: "bold",
                }}
            >
                SHANNONS REGELN (1949)
                <br/>
                <br/>
                DAS SICHERHEITSLEVEL DER NACHRICHTEN SOLLTE SICH IM
                VERSCHLUESSELUNGSAUFWAND WIDERSPIEGELN.
                <br/>
                <br/>
                DIE VERWENDETEN SCHLUESSEL UND DER
                VERSCHLUESSELUNGSALGORITHMUS SOLLTEN SO EINFACH WIE MOEGLICH
                SEIN.
                <br/>
                <br/>
                DIE UMSETZUNG DES PROZESSES SOLLTE SO EINFACH WIE MOEGLICH SEIN.
                <br/>
                <br/>
                FEHLER IM VERSCHLUESSELN SOLLTEN SICH NICHT VERBREITEN UM WEITERE
                NACHRICHTEN NICHT ZU ZERSTOEREN.
                <br/>
                <br/>
                DIE GROESSE DES VERSCHLUESSELTEN TEXTES SOLLTE NICHT GROESSER SEIN
                ALS DIE GROESSE DES KLARTEXTES
            </Typography>
        </Card>
    );

    const handleClickCupBoard = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Hinweis über Shannons Regeln angeklickt",
        };
        await createInteraktion(interactionDto);
    };

    return (
        <>
            <BookCupboard
                // @ts-ignore
                scale={0.8}
                position={[8, WORLD_COORDINATE[1], -8]}
                onClick={handleClickCupBoard}
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
