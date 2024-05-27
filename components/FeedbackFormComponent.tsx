"use client";
import React, {useState} from 'react';
import {Box, Button, Card, FormControl, FormLabel, Stack, Typography} from "@mui/material";
import Input from "@mui/joy/Input";
import {useRouter} from "next/navigation";
import {useGlobalStore} from "@/store/useGlobalStore";
import {KommentarDto} from "@/api/kommentar";

export const FeedbackFormComponent: React.FC = () => {
    const router = useRouter();
    const [comment, setComment] = useState<string>("");
    const createKommentar = useGlobalStore((state) => state.createKommentar);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const handleSubmitComment = () => {
        const player = getSpielerFromLocalStorage();
        if (!player) return;
        const commentToSubmit: KommentarDto = {
            spielerId: player.id,
            semesterId: player.semesterId,
            inhalt: comment,
        };
        createKommentar(commentToSubmit);
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
                    Möchten Sie einen Kommentar über Ihre Erfahrungen beim Spielen hinterlassen?
                    Ihr Kommentar wird zur Verbesserung des Exit-Spiels beitragen
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
                    gridTemplateColumns: "repeat(2, minmax(150px, 1fr))",
                    pt: "var(--space-4)",
                }}
            >
                <Button
                    variant={"outlined"}
                    size={"lg"}
                    sx={{ width: "100%" }}
                    onClick={() => router.push("/result-and-qrcode")}
                >
                    Nein danke
                </Button>
                <Button
                    size={"lg"}
                    sx={{ width: "100%" }}
                    disabled={comment === ""}
                    onClick={handleSubmitComment}
                >
                    Kommentar absenden
                </Button>
            </Box>
        </Stack>
    );
};

