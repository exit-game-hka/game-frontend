import React, {ReactNode} from 'react';
import {Transition} from 'react-transition-group';
import Modal from '@mui/joy/Modal';
import ModalDialog, {ModalDialogProps} from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Typography from "@mui/joy/Typography";
import {DialogHeader} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {Divider, ModalClose} from "@mui/joy";
import {ModalDialogTypeMap} from "@mui/joy/ModalDialog/ModalDialogProps";
import {useMediaQuery} from "@/hooks/useMediaQuery";

export type ModalProps = {
    open: boolean;
    title?: string;
    subtitle?: string;
    content?: ReactNode;
    onClose?: (() => void) | undefined;
    modalDialogProps?: ModalDialogProps;
}
export const TaskModalComponent: React.FC<ModalProps> = (props: ModalProps) => {
    const { open, title, subtitle, content, modalDialogProps, onClose } = props;
    const { isSmall } = useMediaQuery();

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
                            size={"lg"}
                            sx={{
                                opacity: 0,
                                transition: `opacity 300ms`,
                                ...{
                                    entering: { opacity: 1 },
                                    entered: { opacity: 1 },
                                }[state],
                            }}
                            {...modalDialogProps}
                            layout={isSmall ? "fullscreen" : "center"}
                        >
                            <ModalClose variant={"soft"} sx={{ borderRadius: "50%" }} />
                            <DialogHeader>
                                {title ? <DialogTitle>{title}</DialogTitle> : null}
                            </DialogHeader>
                            <Divider />
                            <DialogContent
                                sx={{
                                    display: "grid",
                                    gridGap: "var(--space-3)",
                                    //gridTemplateColumns: "minmax(290px, 350px)",
                                    //gridTemplateRows: "1fr minmax(auto-fit, 50dvh)",
                                }}
                            >
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
