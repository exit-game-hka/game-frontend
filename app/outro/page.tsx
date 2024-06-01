"use client";
import React from 'react';
import {Box, Button, Card, Sheet, Stack, Typography, useTheme} from "@mui/material";
import {PageContentWrapperComponent} from "@/components/shared/PageContentWrapperComponent";
import Link from "next/link";

const DebriefingPage: React.FC = () => {
    const theme = useTheme();

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
                    <Typography component={"p"} sx={{ mt: "var(--space-2)" }}>
                        KLASSE, SIE HABEN DEN KELLER DES PROFESSORS AUFGERAEUMT
                        UND SOGAR DAS PASSBILD VON ALAN TURING GEFUNDEN. DER
                        PROFESSOR IST HOECHST DANKBAR UND GIBT IHNEN NICHT NUR
                        DIE ZUSÄTZLICHEN CREDITS, SONDERN LAEDT SIE SOGAR NOCH
                        AUF EIN MATE EIN
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
                    <Link href={"/feedback"}>
                        <Button size={"lg"} sx={{ width: "100%" }}>Weiter</Button>
                    </Link>
                </Box>
            </Stack>
        </PageContentWrapperComponent>
    );
};

export default DebriefingPage;
