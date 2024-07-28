import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {ExitDoor} from "@/components/ExitDoor";
import {Html} from "@react-three/drei";
import {GroupProps} from "@react-three/fiber";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import Stack from "@mui/joy/Stack";
import {Alert, Button, Typography} from "@mui/joy";
import ReportIcon from "@mui/icons-material/Report";

type Props = {
    doorProps: GroupProps;
};

export const DoorToPreviousRoomComponent: React.FC<Props> = (props) => {
    const { doorProps } = props;
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navigateBack = () => {
        setIsOpen(false);
        router.back();
    };

    const modalContent = (
        <Stack spacing={"var(--space-6)"}>
            <Typography>
                Diese Tür führt Sie zum vorherigen Raum. Wenn Sie diese Tür öffnen, verlassen Sie den aktuellen Raum.
                Sind Sie sicher, dass Sie in den vorherigen Raum zurückkehren möchten?
            </Typography>
            <Alert
                color={"warning"}
                variant={"soft"}
                startDecorator={<ReportIcon />}
                sx={{ alignItems: "flex-start" }}
            >
                Ihre bisherigen Fortschritte werden trotzdem gespeichert!
            </Alert>
            <Stack spacing={"var(--space-2)"} sx={{ justifyContent: "space-between" }}>
                <Button
                    variant={"outlined"}
                    onClick={() => setIsOpen(false)}
                >
                    Nein - Hier bleiben
                </Button>
                <Button
                    onClick={navigateBack}
                >
                    Ja - Zurückkehren
                </Button>
            </Stack>
        </Stack>
    );

    return (
        <>
            <ExitDoor
                rotation-y={-Math.PI / 2}
                // @ts-ignore
                setAnimationActions={() => {}}
                scale={1}
                onClick={() => setIsOpen(true)}
                {...doorProps}
            />
            <Html>
                <TaskModalComponent
                    open={isOpen}
                    title="Zurückkehren"
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

