import React, {useState} from 'react';
import {TableWithBooksAndGlobe} from "@/components/TableWithBooksAndGlobe";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Card} from "@mui/material";
import {Typography} from "@mui/joy";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";

export const OfficeWithBooksAndGlobeComponent: React.FC<InteractiveObjectProps> = (props) => {
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
            <Typography sx={{ fontSize: "20px" }}>
                DIE ANZAHL DER ZEILEN IST WICHTIG
            </Typography>
        </Card>
    );

    const handleClickOpenedDrawer = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Buch 2 mit dem Text 'Die Anzahl der Zeilen ist wichtig' angeklickt",
        };
        await createInteraktion(interactionDto);
    };

    return (
        <>
            <TableWithBooksAndGlobe
                // @ts-ignore
                scale={0.5}
                rotation-y={Math.PI}
                position={[-3, -2.2, -6]}
                onClickOpenedDrawer={handleClickOpenedDrawer}
            />
            <Html>
                <TaskModalComponent
                    open={isOpen}
                    content={modalContent}
                    onClose={() => setIsOpen(false)}
                    modalDialogProps={{
                        maxWidth: "500px",
                    }}
                />
            </Html>
        </>
    );
};
