"use client";
import React, {useState} from 'react';
import {Box, Button, Card, FormControl, FormLabel, Stack, Typography} from "@mui/material";
import Input from "@mui/joy/Input";
import {useRouter} from "next/navigation";
import {useGlobalStore} from "@/store/useGlobalStore";
import {KommentarDto} from "@/api/kommentar";
import {NOTIFICATION_TYPE, NotificationDto} from "@/api/notification";
import {useMediaQuery} from "@/hooks/useMediaQuery";

export const FeedbackFormComponent: React.FC = () => {
    const router = useRouter();
    const { isSmall } = useMediaQuery();
    const [comment, setComment] = useState<string>("");
    const createKommentar = useGlobalStore((state) => state.createKommentar);
    const getPlayerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);
    const emitNotification = useGlobalStore((state) => state.emitNotification);

    const handleSubmitComment = () => {
        const player = getPlayerFromLocalStorage();
        if (!player) return;
        const commentToSubmit: KommentarDto = {
            spielerId: player.id,
            semesterId: player.semesterId,
            inhalt: comment,
            creationTimestamp: new Date(),
        };
        createKommentar(commentToSubmit);

        const notificationDto: NotificationDto = {
            userName: player.spielerId,
            title: "Neuer Kommentar",
            content: `Spieler ${player.spielerId} hat einen Kommentar hinterlassen.`,
            creationDate: new Date().toISOString(),
            type: NOTIFICATION_TYPE.PLAYER_SENT_COMMENT,
        };
        emitNotification(notificationDto);

        router.push("/result-and-qrcode");
    };

    return (
        <Stack
            spacing={"var(--space-4)"}
            alignItems="center"
            alignContent="center"
        >
            <Typography level="h2">Kommentar hinterlassen</Typography>
            <Card
                sx={{
                    display: "grid",
                    gridGap: "var(--space-4)",
                    maxWidth: "600px",
                    py: "var(--space-8)",
                    px: "var(--space-6)",
                    borderRadius: "var(--space-3)",
                }}
            >
                <Typography component={"p"} sx={{ mt: "var(--space-2)" }}>
                    Möchten Sie einen Kommentar über Ihre Erfahrung beim Spielen hinterlassen?
                    Ihr Kommentar wird zur Verbesserung des Exit-Games beitragen.
                </Typography>
                <FormControl size={"lg"}>
                    <FormLabel>Kommentar</FormLabel>
                    <Input
                        type={"text"}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        slotProps={{
                            input: {
                                component: "textarea",
                            }
                        }}
                        placeholder={"Hier eingeben"}
                    />
                </FormControl>
            </Card>
            <Box
                component={"div"}
                sx={{
                    display: "grid",
                    gridGap: "var(--space-4)",
                    gridTemplateColumns: isSmall ? "1fr" : "repeat(2, minmax(150px, 1fr))",
                    pt: "var(--space-4)",
                    width: isSmall ? "100%" : "unset",
                }}
            >
                <Button
                    variant={"outlined"}
                    size={"lg"}
                    sx={{ width: "100%" }}
                    onClick={() => router.push("/result-and-qrcode")}
                >
                    Weiter ohne Kommentar
                </Button>
                <Button
                    size={"lg"}
                    sx={{ width: "100%" }}
                    disabled={comment === ""}
                    onClick={handleSubmitComment}
                >
                    Weiter und Kommentar absenden
                </Button>
            </Box>
        </Stack>
    );
};
