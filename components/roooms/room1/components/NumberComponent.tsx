import React from 'react';
import {ModalProps} from "@/components/shared/TaskModalComponent";
import {Number} from "@/public/models/number_for_room1/Number";
import {Box, Typography} from "@mui/joy";

type Props = {
    triggerModal: (modalProps: ModalProps) => void;
};
export const NumberComponent: React.FC<Props> = (props) => {
    const {triggerModal} = props;

    const modalContent = (
        <Box component={"div"}>
            <Typography
                component={"p"}
                sx={{
                    fontSize: "100px",
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "auto",
                }}
            >
                26
            </Typography>
        </Box>
    );

    return (
        <Number
            scale={0.45}
            position={[14, 4, -10]}
            onClick={() => triggerModal({
                    open: true,
                    title: "Hinweis",
                    content: modalContent,
                }
            )}
        />
    );
};

