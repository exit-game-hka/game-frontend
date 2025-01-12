import React, {useState} from 'react';
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {Card, Typography} from "@mui/material";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";
import {WallPictures} from "@/components/WallPictures";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {useParams} from "next/navigation";

export const WallPicturesComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContent = (
        <Card
            sx={{
                background: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/rooms/ancien_paper.jpg')`,
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
                sx={{
                    fontWeight: "bold",
                }}
            >
                WIE LAUTET DIE LOESUNG BEI GLEICHEN REGELN WIE IN RAUM 5?
                <br/>
                <br/>
                YJYAL   RSBPGLCE <br />
                ILDYAIERC   BFGC <br />
                CGLGEHKY
            </Typography>
        </Card>
    );

    const handleClickCoffeeFrame = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Notiz angeklickt",
        };
        await createInteraktion(id as string, interactionDto);
    };

    return (
        <>
            <WallPictures
                // @ts-ignore
                scale={1.5}
                position={[-9.9, 0, -3.5]}
                onClickCoffeeFrame={handleClickCoffeeFrame}
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
