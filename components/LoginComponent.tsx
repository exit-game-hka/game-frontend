"use client";
import React, {ChangeEvent, useEffect, useState} from "react";
import {SpielerDto} from "@/api/spieler";
import {useRouter} from "next/navigation";
import {useGlobalStore} from "@/store/useGlobalStore";
import useSWR from "swr";
import {Semester} from "@/api/semester";
import {Veranstaltung} from "@/api/veranstaltung";
import {StatusDto} from "@/api/status";
import {NOTIFICATION_TYPE, NotificationDto} from "@/api/notification";
import {LoadingComponent} from "@/components/shared/LoadingComponent";
import {Alert, Box, Button, Card, Stack} from "@mui/material";
import {FormContainerComponent} from "@/components/shared/FormContainerComponent";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Autocomplete from "@mui/joy/Autocomplete";
import {useMediaQuery} from "@/hooks/useMediaQuery";

const CLIENT_PLAYER_PASSWORD="98#65@3f7$c+0d/29" as const;

type LoginData = Partial<SpielerDto> & {
    password: string;
};

const INITIAL_STATE: LoginData = {
    spielerId: "",
    semesterId: undefined,
    veranstaltungId: undefined,
    password: "",
} as const;

const LoginComponent: React.FC = () => {
    const router = useRouter();
    const { isSmall } = useMediaQuery();
    const getPlayerBySpielerId = useGlobalStore((state) => state.getSpielerBySpielerId);
    const setSpieler = useGlobalStore((state) => state.setSpieler);
    const getPlayerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);
    const createStatus = useGlobalStore((state) => state.createStatus);
    const getStatusBySpielerId = useGlobalStore((state) => state.getStatusBySpielerId);
    const createSpieler = useGlobalStore((state) => state.createSpieler);
    const getAllSemester = useGlobalStore((state) => state.getAllSemester);
    const getAllVeranstaltungen = useGlobalStore((state) => state.getAllVeranstaltungen);
    const emitNotification = useGlobalStore((state) => state.emitNotification);

    const [loginData, setLoginData] = useState<LoginData>(INITIAL_STATE as LoginData);

    const [formError, setFormError] = useState<string | undefined>(undefined);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        data: semesters,
        isLoading: isLoadingSemesters,
        error: errorSemesters,
    } = useSWR<Semester[]>("getAllSemester", async () => await getAllSemester());

    const {
        data: veranstaltungen,
        isLoading: isLoadingVeranstaltungen,
        error: errorVeranstaltungen,
    } = useSWR<Veranstaltung[]>("getAllVeranstaltungen", async () => await getAllVeranstaltungen());

    useEffect(() => {
        generatePlayerId();
    }, []);

    const setPlayerAndNavigateToAvatarSelection = async (playerId: string) => {
        const player = await getPlayerBySpielerId(playerId);
        setSpieler(player);

        const status = await getStatusBySpielerId(player.id);
        if (!status) {
            const statusToSubmit: StatusDto = {
                spielerId: player.id,
                semesterId: player.semesterId,
                veranstaltungId: player.veranstaltungId,
                spielStart: new Date(),
                spielEnde: null,
                istSpielBeendet: false,
                istSpielAbgebrochen: false,
            };
            await createStatus(statusToSubmit);
        }

        router.push("/avatar-selection");
    };

    const handleSubmit = async () => {
        if (!loginData.spielerId) {
            setFormError("Generieren Sie erst eine Spieler-ID.");
            return;
        }
        if (!loginData.password || loginData.password !== CLIENT_PLAYER_PASSWORD) {
            setFormError("Falsches Passwort");
            return;
        }
        if (!loginData.semesterId) {
            setFormError("Wählen Sie ein Semester aus.");
            return;
        }
        if (!loginData.veranstaltungId) {
            setFormError("Wählen Sie ein Fachgebiet aus.");
            return;
        }

        setIsLoading(true);

        const {password: _, ...spielerDto} = loginData;
        await createSpieler(spielerDto as SpielerDto);
        await setPlayerAndNavigateToAvatarSelection(loginData.spielerId);
        setIsLoading(false);
    };

    const generatePlayerId = () => {
        setLoginData(prevState => ({
            ...prevState,
            spielerId: `#${new Date().getTime().toString()}`,
        }));
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault();
        event?.stopPropagation();
        setLoginData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSemesterChange = (option: Semester) => {
        setLoginData(prevState => ({
            ...prevState,
            semesterId: option ? (option as Semester).id : "",
        }));
    }

    const handleVeranstaltungChange = (option: Veranstaltung) => {
        setLoginData(prevState => ({
            ...prevState,
            veranstaltungId: option ? (option as Veranstaltung).id : "",
        }));
    }

    if (
        isLoadingSemesters ||
        isLoadingVeranstaltungen ||
        !semesters ||
        !veranstaltungen
    ) return <LoadingComponent message={"Das Formular wird geladen"} />

    if (isLoading) return <LoadingComponent message={"Sie werden angemeldet"} />

    if (errorSemesters) return <Alert color="danger">
        Semester konnten nicht geladen werden: {(errorSemesters as Error).toString()}
    </Alert>

    if (errorVeranstaltungen) return <Alert  color="danger">
        Fachgebiete konnten nicht geladen werden: {(errorVeranstaltungen as Error).toString()}
    </Alert>

    return (
        <Stack
            sx={{
                display: "grid",
                width: isSmall ? "100%" : "500px",
            }}
            spacing={"var(--space-4)"}
            alignItems="center"
            alignContent="center"
        >
            <Card
                sx={{
                    display: "grid",
                    py: "var(--space-8)",
                    px: "var(--space-6)",
                    borderRadius: "var(--space-4)",
                }}
            >
                <Box
                    component={"img"}
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/into-thumbnail.jpg`}
                    alt={"into thumbnail"}
                    sx={{
                        objectFit: "cover",
                        width: "200px",
                        borderRadius: "50%",
                        border: "3px solid white",
                        justifySelf: "center",
                        mb: "var(--space-4)",
                    }}
                />
                <FormContainerComponent>
                    <FormControl size="md">
                        <FormLabel>Passwort</FormLabel>
                        <Input
                            slotProps={{
                                input: {
                                    component: "input",
                                    name: "password",
                                    type: "password",
                                    value: loginData.password,
                                    placeholder: "Passwort eingeben",
                                    onChange: handleChange,
                                }
                            }}
                        />
                    </FormControl>
                    <FormControl size="md">
                        <FormLabel>Semester</FormLabel>
                        <Autocomplete
                            placeholder="Semester auswählen"
                            options={semesters}
                            getOptionLabel={(option: Semester) => option.bezeichnung}
                            onChange={(_, option) => handleSemesterChange(option as unknown as Semester)}
                        />
                    </FormControl>
                    <FormControl size="md">
                        <FormLabel>Fachgebiet</FormLabel>
                        <Autocomplete
                            placeholder="Fachgebiet auswählen"
                            options={veranstaltungen}
                            getOptionLabel={(option: Veranstaltung) => `${option.bezeichnung} - ${option.name}`}
                            onChange={(_, option) => handleVeranstaltungChange(option as unknown as Veranstaltung)}
                        />
                    </FormControl>
                    {formError ? <Alert color="danger">{formError}</Alert> : null}
                    <Button onClick={handleSubmit}>Weiter</Button>
                </FormContainerComponent>
            </Card>
        </Stack>
    );
};

export default LoginComponent;
