"use client";
import React from 'react';
import {PageContentWrapperComponent} from "@/components/shared/PageContentWrapperComponent";
import {Box, Card, Sheet, Stack, Typography, useTheme} from "@mui/joy";
import {Button} from "@mui/material";
import {useRouter, useSearchParams} from "next/navigation";

const IntroPage: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();
    //const params = useSearchParams();

    // TODO: Remove later !!!. Just for MVP.
    const navigateToRoomOne = () => {
        //router.push(`/game-scene/rooms/20000000-0000-0000-0000-000000000001?${params?.toString()}`);
        router.push("/game-scene/rooms/20000000-0000-0000-0000-000000000001");
    };

    return (
        <PageContentWrapperComponent>
            <Stack
                spacing={"var(--space-4)"}
                alignItems="center"
                alignContent="center"
                textAlign="center"
            >
                <Typography level="h2">Briefing - Worum geht es ?</Typography>
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
                        Um ein paar zusätzliche Credit Points zu ergattern, erklären Sie sich dazu bereit, den
                        Keller Ihres Informatikprofessors auszumisten. Er lässt Sie alleine und sagt, dass er nach
                        seiner Mittagspause in X Minuten nach Ihnen sehen wird.
                    </Typography>
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
                        size={"lg"}
                        variant={"outlined"}
                        sx={{ width: "100%" }}
                        onClick={() => router.back()}
                    >
                        Zurück
                    </Button>
                    <Button
                        size={"lg"}
                        sx={{ width: "100%" }}
                        onClick={navigateToRoomOne}
                    >
                        Weiter
                    </Button>
                </Box>
            </Stack>
        </PageContentWrapperComponent>
    );
};

export default IntroPage;

