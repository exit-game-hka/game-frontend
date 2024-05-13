import React, {ChangeEvent, useEffect, useState, useCallback} from 'react';
import {Transition} from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import {Alert, Box, Button, Divider, ModalClose} from "@mui/material";
import {DialogHeader} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
    open: boolean;
    title?: string;
    subtitle?: string;
    onSuccess: () => void;
    onClose?: (() => void) | undefined;
};

export const AnswerInputModalComponent: React.FC<Props> = (props) => {
    const { open, title, subtitle, onSuccess, onClose } = props;
    const [inputValue, setInputValue] = useState<string>("");
    const [isComplete, setIsComplete] = useState<boolean | undefined>(undefined);

    const closeModal = useCallback(() => {
        resetStates();
        if (!onClose) return;
        onClose();
    }, [onClose]);
    
    useEffect(() => {
        if (!isComplete) return;
        setTimeout(() => {
            onSuccess();
            closeModal();
        }, 2000);
    }, [closeModal, isComplete, onSuccess]);

    const resetStates = () => {
        setInputValue("");
        setIsComplete(undefined);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault();
        event?.stopPropagation();

        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        if (inputValue !== "RAETSEL") {
            setIsComplete(false);
            return;
        }
        setIsComplete(true);
    };

    return (
        <>
            <Transition in={open} timeout={400}>
                {(state: string) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={closeModal}
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
                                <Box
                                    component={"div"}
                                    sx={{
                                        display: "grid",
                                        gridGap: "var(--space-3)",
                                        gridTemplateColumns: "minmax(290px, 350px)",
                                    }}
                                >
                                    <Input
                                        type={"text"}
                                        size={"lg"}
                                        value={inputValue}
                                        onChange={handleChange}
                                        slotProps={{
                                            input: {
                                                component: "input",
                                            }
                                        }}
                                        placeholder={"Hier eingeben"}
                                    />
                                    {isComplete ?
                                        <Alert
                                            color={"success"}
                                            variant={"outlined"}
                                            startDecorator={<CheckCircleIcon />}
                                            sx={{ alignItems: 'flex-start' }}
                                        >
                                            EXZELLENT. SIE HABEN DIE PLATZHALTER DURCHSCHAUT!
                                        </Alert> :
                                        isComplete === false ?
                                            <Alert
                                                color={"danger"}
                                                variant={"outlined"}
                                                startDecorator={<ReportIcon />}
                                                sx={{ alignItems: 'flex-start' }}
                                            >
                                                SCHAUEN SIE NOCH EINMAL NACH, OB DIE ZAHLEN ALS
                                                SUBSTITUTE FUNGIEREN UND PROBIEREN SIE ES ERNEUT!
                                            </Alert> : null
                                    }
                                    <Button onClick={handleSubmit}>Antwort senden</Button>
                                </Box>
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
        </>
    );
};

