import React, {useState} from 'react';
import {WallPictures} from "@/public/models/wall_pictures/WallPictures";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Card} from "@mui/material";
import {Typography} from "@mui/joy";
import {useMediaQuery} from "@/hooks/useMediaQuery";

export const WallPapersComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isSmall } = useMediaQuery();

    const modalContent = (
        <Card>
            <Typography
                component={"p"}
                sx={{
                    fontSize: isSmall ? "40px" : "60px",
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "auto",
                }}
            >
                SUBSTITUTION
            </Typography>
        </Card>
    );

    return (
        <>
            <WallPictures
                // @ts-ignore
                scale={1.5}
                rotation-y={-Math.PI}
                position={[9.95, 0, -6]}
                onClickCoffeeFrame={() => setIsOpen(true)}
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

