"use client";
import React from 'react';
import {Box, Button, Card, Sheet, Stack, Typography, useTheme} from "@mui/material";
import {PageContentWrapperComponent} from "@/components/shared/PageContentWrapperComponent";
import {useGlobalStore} from "@/store/useGlobalStore";
import {NOTIFICATION_TYPE, NotificationDto} from "@/api/notification";
import {useRouter} from "next/navigation";

const DebriefingPage: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();
    const emitNotification = useGlobalStore((state) => state.emitNotification);
    const getPlayerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const sendNotificationAndNavigateToFeedbackForm = () => {
        const player = getPlayerFromLocalStorage();

        if (!player) return;
        const notificationDto: NotificationDto = {
            userName: player.spielerId,
            title: "Spiel erfolgreich beendet",
            content: `Spieler ${player.spielerId} hat das Spiel erfolgreich beendet.`,
            creationDate: new Date().toISOString(),
            type: NOTIFICATION_TYPE.PLAYER_ENDED_GAME,
        };
        emitNotification(notificationDto);
        router.push("/result-and-qrcode");
    };

    return (
        <PageContentWrapperComponent>
            <Stack
                spacing={"var(--space-4)"}
                alignItems="center"
                alignContent="center"
                textAlign="center"
            >
                <Typography level="h2">Debriefing</Typography>
                <Card
                    sx={{
                        maxWidth: "600px",
                        py: "var(--space-8)",
                        px: "var(--space-6)",
                        borderRadius: "var(--space-3)",
                    }}
                >
                    <Sheet>
                        <Box
                            component={"img"}
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/into-thumbnail.jpg`}
                            alt={"into thumbnail"}
                            sx={{
                                objectFit: "cover",
                                width: "200px",
                                borderRadius: "var(--space-3)",
                                border: `5px solid ${theme.vars.palette.neutral.outlinedBorder}`,
                                filter: `drop-shadow(0 0 20px ${theme.vars.palette.neutral.outlinedBorder})`,
                            }}
                        />
                    </Sheet>
                    <Typography component={"p"} level={"body-lg"} sx={{ mt: "var(--space-2)" }}>
                        Klasse, Sie haben den Keller des Professors aufgeräumt und sogar das Passbild von Alan
                        Turing gefunden. Der Professor ist höchst dankbar und gibt Ihnen nicht nur die zusätzlichen
                        Credits, sondern lädt Sie sogar noch auf ein Mate ein. Klicken Sie auf weiter, um das Spiel
                        abzuschließen und ihre Ergebnisse zu erhalten.
                    </Typography>
                </Card>
                <Box
                    component={"div"}
                    sx={{
                        display: "grid",
                        gridGap: "var(--space-4)",
                        gridTemplateColumns: "repeat(1, minmax(150px, 1fr))",
                        pt: "var(--space-4)",
                    }}
                >
                    <Button
                        size={"lg"}
                        sx={{ width: "100%" }}
                        onClick={sendNotificationAndNavigateToFeedbackForm}
                    >
                        Weiter
                    </Button>
                </Box>
            </Stack>
        </PageContentWrapperComponent>
    );
};

export default DebriefingPage;
