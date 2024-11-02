import React, {useState} from 'react';
import {BookCupboard} from "@/components/BookCupboard";
import {WORLD_COORDINATE} from "@/app/contants";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box, Table} from "@mui/joy";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";
import {useParams} from "next/navigation";

export const SmallCupBoardComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const rowData = [
        "ZEILE 1: DATUM",
        "ZEILE 2: NAME",
        "ZEILE 3: NOTE",
        "ZEILE 4: PUNKTZAHL",
    ];

    const modalContent = (
        <Table
            variant={"outlined"}
            size={"lg"}
        >
            <Box component={"tbody"}>
                {rowData.map((data, index) =>
                    <Box component={"tr"} key={index}>
                        <Box component={"td"} sx={{ width: "8%" }}>{index + 1}</Box>
                        <Box component={"td"}>{data}</Box>
                    </Box>
                )}
            </Box>
        </Table>
    );

    const handleClickBookCupBoard = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Tabelle mit vier Zeilen angeklickt",
        };
        await createInteraktion(id as string, interactionDto);
    };

    return (
        <>
            <BookCupboard
                // @ts-ignore
                scale={0.7}
                rotation-y={Math.PI / 2}
                position={[-9.55, WORLD_COORDINATE[1], -4]}
                onClick={handleClickBookCupBoard}
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
