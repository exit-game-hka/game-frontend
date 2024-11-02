import React, {ChangeEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Transition} from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog, {ModalDialogProps} from "@mui/joy/ModalDialog";
import {Alert, Button, Divider, FormControl, FormHelperText, FormLabel, ModalClose, Stack} from "@mui/joy";
import {DialogHeader} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {convertMillisecondsToMinutes, useGlobalStore} from "@/store/useGlobalStore";
import {ErgebnisDto} from "@/api/ergebnis";

type Props = {
    open: boolean;
    title?: string;
    subtitle?: string;
    onSuccess: () => void;
    answer: string;
    aufgabeId: string;
    submitButtonLabel?: string;
    successMessage: ReactNode;
    timeoutOnSuccess?: number | undefined;
    failureMessage: string;
    onClose?: (() => void) | undefined;
    modalDialogProps?: ModalDialogProps;
};

export const AnswerInputModalComponent: React.FC<Props> = (props) => {
    const {
        open,
        title,
        subtitle,
        answer,
        aufgabeId,
        submitButtonLabel,
        successMessage,
        failureMessage,
        onSuccess,
        timeoutOnSuccess,
        modalDialogProps,
        onClose,
    } = props;
    const [inputValue, setInputValue] = useState<string>("");
    const [isComplete, setIsComplete] = useState<boolean | undefined>(undefined);
    const { isSmall } = useMediaQuery();
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.focus();
    }, [inputRef, props]);

    const startTime : number = useMemo((): number => {
        return new Date().getTime();
    }, []);

    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);
    const createErgebnis = useGlobalStore((state) => state.createErgebnis);

    const closeModal = useCallback(() => {
        resetStates();
        if (!onClose) return;
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (!isComplete) return;

        const timeoutToWait = timeoutOnSuccess ?? 2000;

        const timeout = setTimeout(() => {
            onSuccess();
            //closeModal();
        }, timeoutToWait);

        return () => clearTimeout(timeout);
    }, [closeModal, isComplete, onSuccess, timeoutOnSuccess]);

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
        if (inputValue.toLowerCase() === answer.toLowerCase()) {
            handleAnswerInput(true);
            setIsComplete(true);
            return;
        }
        handleAnswerInput(false);
        setIsComplete(false);
    };

    const computeElapsedTime = (): number => {
        return convertMillisecondsToMinutes(new Date().getTime() - startTime);
    };

    const handleAnswerInput = (isCorrectAnswer: boolean) => {
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const ergebnisDto: ErgebnisDto = {
            spielerId: spieler.id,
            aufgabeId: aufgabeId,
            semesterId: spieler.semesterId,
            geloestIn: isCorrectAnswer ? computeElapsedTime() : undefined,
        };
        createErgebnis(ergebnisDto);
    }

    return (
        <>
            <Transition in={open} timeout={400}>
                {(state: string) => (
                    <Modal
                        //keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={isComplete ? undefined : closeModal}
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
                            zIndex: "var(--z-index-modal)",
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
                                //mt: isSmall ? "initial" : -20,
                                "@media screen and (min-width: 900px)": {
                                    mt: -5,
                                },
                            }}
                            {...modalDialogProps}
                            layout={isSmall ? "fullscreen" : "center"}
                        >
                            {!isComplete ? <ModalClose variant={"soft"} sx={{ borderRadius: "50%" }} /> : null}
                            <DialogHeader>
                                {title ? <DialogTitle>{title}</DialogTitle> : null}
                            </DialogHeader>
                            <Divider />
                            <DialogContent>
                                {subtitle ? <Typography level="body-sm">{subtitle}</Typography> : null}
                                <Stack spacing={"var(--space-4)"}>
                                    <FormControl size={"lg"}>
                                        <FormLabel>Lösungswort</FormLabel>
                                        <Input
                                            type={"text"}
                                            value={inputValue.toUpperCase()}
                                            onChange={handleChange}
                                            slotProps={{
                                                input: {
                                                    ref: inputRef,
                                                    autoFocus: true,
                                                    component: "input",
                                                }
                                            }}
                                            placeholder={"Hier eingeben"}
                                        />
                                        <FormHelperText>Geben Sie das Lösungswort in Großbuchstaben und ohne Umlaute ein</FormHelperText>
                                    </FormControl>
                                    {isComplete ?
                                        <Alert
                                            color={"success"}
                                            variant={"soft"}
                                            startDecorator={<CheckCircleIcon />}
                                            sx={{ alignItems: 'flex-start' }}
                                        >
                                            {successMessage}
                                        </Alert> :
                                        isComplete === false ?
                                            <Alert
                                                color={"danger"}
                                                variant={"soft"}
                                                startDecorator={<ReportIcon />}
                                                sx={{ alignItems: 'flex-start' }}
                                            >
                                                {failureMessage}
                                            </Alert> : null
                                    }
                                    {/*{isComplete ?*/}
                                    {/*    <Button onClick={onSuccess}>Weiter</Button> :*/}
                                    {/*    <Button onClick={handleSubmit}>{submitButtonLabel}</Button>*/}
                                    {/*}*/}
                                    <Button onClick={handleSubmit}>{submitButtonLabel ?? "Weiter"}</Button>
                                </Stack>
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
        </>
    );
};
