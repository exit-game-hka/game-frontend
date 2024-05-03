import React, {useState} from 'react';
import { Transition } from 'react-transition-group';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Typography from "@mui/joy/Typography";
import Input from '@mui/joy/Input';
import {Raum} from "@/api/raum";
import Stack from '@mui/joy/Stack';

type Props = {
    open: boolean;
    close: () => void;
    room: Raum;
}
export const TaskModalComponent: React.FC<Props> = (props: Props) => {
    const { open, close, room } = props;

    return (
        <React.Fragment>
            <Transition in={open} timeout={400}>
                {(state: string) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={close}
                        slotProps={{
                            backdrop: {
                                sx: {
                                    opacity: 0,
                                    backdropFilter: 'none',
                                    transition: `opacity 400ms, backdrop-filter 400ms`,
                                    ...{
                                        entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                                        entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                                    }[state],
                                },
                            },
                        }}
                        sx={{
                            visibility: state === 'exited' ? 'hidden' : 'visible',
                        }}
                    >
                        <ModalDialog
                            sx={{
                                opacity: 0,
                                transition: `opacity 300ms`,
                                ...{
                                    entering: { opacity: 1 },
                                    entered: { opacity: 1 },
                                }[state],
                            }}
                        >
                            <DialogTitle>{room.aufgaben[0].wert}</DialogTitle>
                            <DialogContent>
                                <Typography level="body-sm">
                                    {`Tipp: ${room.aufgaben[0].beschreibung}`}
                                </Typography>
                                <Stack spacing={"var(--space-3)"} sx={{ mt: "var(--space-5)"}}>
                                    <Input size="lg" placeholder="Large" />
                                    <Button>Antwort senden</Button>
                                </Stack>
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
        </React.Fragment>
    );
};
