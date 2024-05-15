import React, {useState} from 'react';
import {WORLD_COORDINATE} from "@/app/contants";
import {TableWithBooksAndGlobe} from "@/components/TableWithBooksAndGlobe";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box, Typography} from "@mui/material";
import Stack from "@mui/joy/Stack";

export const TableWithBooksAndGlobeComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const modalContent = (
        <Stack spacing={"var(--space-3)"}>
            {/*<Box*/}
            {/*    component={"img"}*/}
            {/*    src={"/rooms/room3/book2.png"}*/}
            {/*    alt={"Buch 2"}*/}
            {/*    sx={{*/}
            {/*        width: "100%",*/}
            {/*        objectFit: "cover",*/}
            {/*        borderRadius: "var(--space-3)",*/}
            {/*    }}*/}
            {/*/>*/}
            <Box
                component="div"
                sx={{
                    background: "url('/rooms/room3/book1_bg.png')",
                    borderRadius: "var(--space-3)",
                    p: "var(--space-4) var(--space-5)",
                }}
            >
                <Stack spacing={"var(--space-3)"} sx={{ fontWeight: 700 }}>
                    <Typography>
                        <b>TRANSPOSITION</b>: METHODE, DURCH DIE SYMBOLE AUS DEM KLARTEXT AN UNTERSCHIEDLICHE STELLEN IM VERSCHLUESSELTEN TEXT POSITIONIERT WERDEN.
                    </Typography>
                    <Typography>
                        SUBSTITUTION: METHODE, DURCH DIE SYMBOLE AUS DEM KLARTEXT DURCH (NORMALERWEISE) ANDERE SYMBOLE IM VERSCHLUESSELTEN TEXT ERSETZT WERDEN.
                    </Typography>
                    <Typography>
                        VERSCHLEIERUNG: METHODE, DURCH DIE ZUSAETZLICHE SYMBOLE IM VERSCHLUESSELTEN TEXT POSITIONIERT WERDEN. DIES DIENT DER VERSCHLEIERUNG DES INHALTES.
                    </Typography>
                </Stack>
            </Box>
            <Typography level={"title-lg"} textAlign={"center"}>Buch 2</Typography>
        </Stack>
    );

    return (
        <>
            <TableWithBooksAndGlobe
                // @ts-ignore
                scale={0.5}
                rotation-y={Math.PI}
                position={[10, WORLD_COORDINATE[1], -8]}
                onClickBookOnTable={() => setIsOpen(true)}
            />
            <Html>
                <TaskModalComponent
                    open={isOpen}
                    title="Hinweis"
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

