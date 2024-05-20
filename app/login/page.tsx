"use client"
import React, {Ref, useRef, useState} from 'react';
import {PageContentWrapperComponent} from "@/components/shared/PageContentWrapperComponent";
import {Alert, Box, Button, Card, Sheet, Stack, Typography} from "@mui/material";
import Input from "@mui/joy/Input";
import {useRouter} from "next/navigation";
import useApplicationContext from "@/hooks/useApplicationContext";
import {useMediaQuery} from "@/hooks/useMediaQuery";

const LoginPage: React.FC = () => {
    const playerRef = useRef<HTMLInputElement>();
    const { isSmall } = useMediaQuery();
    const router = useRouter();
    const { getSpielerByAvatarName, saveSpieler } = useApplicationContext();
    const [error, setError] = useState<string | undefined>(undefined);

    const navigateToGameScene = async () => {
        if (!playerRef.current) return;
        const player = await getSpielerByAvatarName(playerRef.current.value);
        if (!player) {
            setError("Diese Spieler-ID ist ungültig");
            return;
        }
        saveSpieler(player);
        router.push("/avatar-selection");
    };

    return (
        <PageContentWrapperComponent>
            <Stack
                spacing={"var(--space-4)"}
                alignItems="center"
                alignContent="center"
                justifyContent="center"
                justifyItems="center"
                textAlign="center"
            >
                <Typography level="h2">Spieler-ID</Typography>
                <Card
                    sx={{
                        maxWidth: "900px",
                        py: "var(--space-8)",
                        px: "var(--space-6)",
                        borderRadius: "var(--space-4)",
                    }}
                >
                    <Sheet>
                        <Box
                            component={"img"}
                            src={"/into-thumbnail.png"}
                            alt={"into thumbnail"}
                            sx={{
                                objectFit: "cover",
                                width: "200px",
                                borderRadius: "50%",
                                border: "3px solid white",
                            }}
                        />
                    </Sheet>
                    <Input
                        type={"text"}
                        size={"lg"}
                        slotProps={{
                            input: {
                                ref: playerRef as Ref<HTMLInputElement>,
                                component: "input",
                            }
                        }}
                        sx={{
                            mt: "var(--space-8)",
                            minWidth: isSmall ? "100%" : "400px",
                        }}
                        placeholder={"Spieler-ID eingeben"}
                    />
                    {error ? <Alert color={"danger"} variant={"soft"}>{error}</Alert> : null}
                    <Button
                        size={"lg"}
                        sx={{ width: "100%" }}
                        onClick={navigateToGameScene}
                    >
                        Bestätigen
                    </Button>
                    <Typography textAlign={"center"} level={"body-sm"} sx={{ mt: "var(--space-4)", color: "var(--color-primary)" }}>
                        Haben Sie keine Spieler-ID oder haben Sie sie verloren ?
                    </Typography>
                    <Typography textAlign={"center"} level={"body-sm"} color={"primary"}>
                        Fragen Sie Ihren Betreuer nach einer ID
                    </Typography>
                </Card>
            </Stack>
        </PageContentWrapperComponent>
    );
};

export default LoginPage;