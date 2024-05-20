import React, {useState} from 'react';
import {BookCupboard} from "@/public/models/book_cupboard/BookCupboard";
import {WORLD_COORDINATE} from "@/app/contants";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box, Table} from "@mui/joy";

export const SmallCupBoardComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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

    return (
        <>
            <BookCupboard
                // @ts-ignore
                scale={0.7}
                rotation-y={Math.PI / 2}
                position={[-9.55, WORLD_COORDINATE[1], -4]}
                onClick={() => setIsOpen(true)}
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
