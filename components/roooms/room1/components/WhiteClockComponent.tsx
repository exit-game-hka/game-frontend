import React from 'react';
import {ModalProps} from "@/components/shared/TaskModalComponent";
import {WhiteClock} from "@/components/WhiteClock";
import {Box} from "@mui/joy";

type Props = {
    triggerModal: (modalProps: ModalProps) => void;
};

export const WhiteClockComponent: React.FC<Props> = (props) => {
    const {triggerModal} = props;

    const modalContent = (
        <Box
            component={"div"}
            sx={{
                display: "grid",
                gridTemplateColumns: "minmax(290px, 1fr)",
            }}
        >
            <Box
                component={"img"}
                src={"/rooms/room1/alphanumeric-wheel.png"}
                sx={{
                    width: "100%",
                    objectFit: "cover",
                }}
            />
        </Box>
    );

    return (
        <WhiteClock
            // @ts-ignore
            scale={1.5}
            position={[3, 4, -10.1]}
            rotation-y={-Math.PI / 2}
            onClick={() => triggerModal({
                    open: true,
                    title: "Hinweis",
                    content: modalContent,
                }
            )}
        />
    );
};

