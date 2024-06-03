"use client"
import React, {ChangeEvent, useEffect, useState} from 'react';
import {PageContentWrapperComponent} from "@/components/shared/PageContentWrapperComponent";
import {Alert, Box, Button, Card, Stack, Typography} from "@mui/material";
import Input from "@mui/joy/Input";
import {useRouter} from "next/navigation";
import {useGlobalStore} from "@/store/useGlobalStore";
import {StatusDto} from "@/api/status";
import {SpielerDto} from "@/api/spieler";
import {Semester} from "@/api/semester";
import {Veranstaltung} from "@/api/veranstaltung";
import useSWR from "swr";
import {FormContainerComponent} from "@/components/shared/FormContainerComponent";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import {LoadingComponent} from "@/components/shared/LoadingComponent";

// TODO: Persist in DB or set as Env. Var in staging or prod env.
const CLIENT_PLAYER_PASSWORD = "98#65@3f7$c+0d/29";

type LoginData = Partial<SpielerDto> & {
    password: string;
};

const INITIAL_STATE: LoginData = {
    spielerId: "",
    semesterId: undefined,
    veranstaltungId: undefined,
    password: "",
} as const;

const LoginPage: React.FC = () => {
    const router = useRouter();
    const getSpielerBySpielerId = useGlobalStore((state) => state.getSpielerBySpielerId);
    const setSpieler = useGlobalStore((state) => state.setSpieler);
    const createStatus = useGlobalStore((state) => state.createStatus);
    const getStatusBySpielerId = useGlobalStore((state) => state.getStatusBySpielerId);
    const createSpieler = useGlobalStore((state) => state.createSpieler);
    const getAllSemester = useGlobalStore((state) => state.getAllSemester);
    const getAllVeranstaltungen = useGlobalStore((state) => state.getAllVeranstaltungen);

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
        const player = await getSpielerBySpielerId(playerId);
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
            setFormError("Wählen Sie eine Veranstaltung aus.");
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
        Veranstaltungen konnten nicht geladen werden: {(errorVeranstaltungen as Error).toString()}
    </Alert>

    return (
        <PageContentWrapperComponent>
            <Stack
                sx={{ display: "grid" }}
                spacing={"var(--space-4)"}
                alignItems="center"
                alignContent="center"
                justifyContent="center"
                justifyItems="center"
            >
                <Typography level="h2">Anmeldung</Typography>
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
                        }}
                    />
                    <FormContainerComponent>
                        <FormControl size="md">
                            <FormLabel>Spieler-ID</FormLabel>
                            <Input
                                readOnly
                                disabled
                                slotProps={{
                                    input: {
                                        component: "input",
                                        name: "spierlerId",
                                        value: loginData.spielerId,
                                        placeholder: "Spieler-ID generieren",
                                        onChange: handleChange,
                                    }
                                }}
                                startDecorator={<VpnKeyOutlinedIcon fontSize="small" />}
                                endDecorator={<Button disabled onClick={generatePlayerId}>Auto. generiert</Button>}
                            />
                        </FormControl>
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
                                getOptionLabel={(option) => option.bezeichnung}
                                onChange={(_, option) => handleSemesterChange(option as Semester)}
                            />
                        </FormControl>
                        <FormControl size="md">
                            <FormLabel>Veranstaltung</FormLabel>
                            <Autocomplete
                                placeholder="Veranstaltung auswählen"
                                options={veranstaltungen}
                                getOptionLabel={(option) => `${option.bezeichnung} - ${option.name}`}
                                onChange={(_, option) => handleVeranstaltungChange(option as Veranstaltung)}
                            />
                        </FormControl>
                        {formError ? <Alert color="danger">{formError}</Alert> : null}
                        <Button onClick={handleSubmit}>Weiter</Button>
                    </FormContainerComponent>
                </Card>
            </Stack>
        </PageContentWrapperComponent>
    );
};

export default LoginPage;
