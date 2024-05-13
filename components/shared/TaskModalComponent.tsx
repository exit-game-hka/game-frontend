import React, {ReactNode} from 'react';
import {Transition} from 'react-transition-group';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Typography from "@mui/joy/Typography";
import {DialogHeader} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {Divider, ModalClose} from "@mui/joy";

export type ModalProps = {
    open: boolean;
    title?: string;
    subtitle?: string;
    content?: ReactNode;
    onClose?: (() => void) | undefined;
}
export const TaskModalComponent: React.FC<ModalProps> = (props: ModalProps) => {
    const { open, title, subtitle, content, onClose } = props;

    return (
        <React.Fragment>
            <Transition in={open} timeout={400}>
                {(state: string) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={onClose}
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
                            <ModalClose variant={"soft"} sx={{ borderRadius: "50%" }} />
                            <DialogHeader>
                                {title ? <DialogTitle>{title}</DialogTitle> : null}
                            </DialogHeader>
                            <Divider />
                            <DialogContent>
                                {subtitle ? <Typography level="body-sm">{subtitle}</Typography> : null}
                                {content ?? null}
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
        </React.Fragment>
    );
};
