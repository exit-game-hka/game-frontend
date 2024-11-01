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
                        ALS SIE DEN TRESOR OEFFNEN, STEHEN SIE PLOETZLICH WIEDER IM BUERO DES PROFESSORS. ER ERKLAERT
                        IHNEN, DASS ER SICH ZU HALLOWEEN EINE ART INFORMATIK GRUSELKABINETT UEBERLEGT HAT UND SIE DAS
                        VERSUCHSKANINCHEN WAREN. ER FREUT SICH, DASS SIE ES AUS DEM KELLER GESCHAFFT UND SOGAR DAS
                        PASSBILD VON ALAN TURING GEFUNDEN HABEN. DER PROFESSOR GIBT IHNEN NICHT NUR DIE ZUSÄTZLICHEN
                        CREDITS, SONDERN LAEDT SIE SOGAR NOCH AUF EIN MATE EIN. KLICKEN SIE AUF WEITER, UM DAS SPIEL
                        ABZUSCHLIESSEN UND IHRE ERGEBNISSE ZU ERHALTEN.
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
