"use client";
import React from "react";
import {Box, Button, Sheet, Typography, useColorScheme} from "@mui/joy";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {Card} from "@mui/material";
import {useRouter} from "next/navigation";

export const OverviewCardComponent: React.FC = () => {
    const { isSmall } = useMediaQuery();
    const { mode } = useColorScheme();
    const router = useRouter();

    const cardBackground = mode === "dark" ?
        `url('${process.env.NEXT_PUBLIC_BASE_PATH}/overview-card-bg-dark.jpg')` :
        `url('${process.env.NEXT_PUBLIC_BASE_PATH}/overview-card-bg-light.jpg')`;

    return (
        <Card
            variant="soft"
            //color="primary"
            //invertedColors
            sx={{
                flexGrow: 1,
                display: "flex",
                //bgcolor: "var(--color-primary)",
                background: cardBackground,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                p: { xs: "36px", md: "70px" },
                py: { xs: "74px", md: "110px" },
                borderRadius: "lg",
                boxShadow: "0 0 3px grey",
                overflow: "hidden",
                "& button": { borderRadius: "sm" },
            }}
        >
            <Box component="div"
                 sx={{
                     display: "grid",
                     gap: "var(--space-2)",
                     zIndex: 1,
                     position: "relative",
                     color: mode === "dark" ? "white" : "var(--joy-palette-neutral-800)",
            }}>
                <Typography level="body-lg" sx={{ fontWeight: 600, color: "var(--color-primary)" }}>Exit-Game HKA</Typography>
                <Typography level="h2" sx={{ fontSize: "35px", maxWidth: isSmall ? "unset" : "650px", color: "inherit" }}>
                    Deine Übungen an der Hochschule jetzt spielerisch vermittelt.
                </Typography>
                <Typography level="title-md" sx={{ fontSize: "18px", mt: 0.5, mb: 2, maxWidth: isSmall ? "unset" : "700px", color: "grey" }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                    ut labore et dolore magna. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.
                </Typography>
                <Box
                    component="div"
                    sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        maxWidth: "max-content",
                        "& > *": { flexGrow: 1, fontWeight: "lg" },
                    }}
                >
                    <Button
                        sx={{ minWidth: 120 }}
                        size="lg"
                        onClick={() => router.push("/login")}
                    >
                        Jetzt spielen
                    </Button>
                    <Button
                        size="lg"
                        variant="plain"
                        endDecorator={<ArrowForwardIcon fontSize="small" />}
                        sx={{
                            "&:hover": { "--Button-gap": "0.625rem" },
                            "& span": { transition: "0.15s" },
                        }}
                        onClick={() => {}}
                    >
                        Mehr erfahren
                    </Button>
                </Box>
            </Box>
            {/*<Box*/}
            {/*    component="img"*/}
            {/*    alt="banner-partial-background"*/}
            {/*    src="/banner-partial-background.png"*/}
            {/*    sx={{ position: "absolute", height: "100%", top: 0, right: 0 }}*/}
            {/*/>*/}
            {/*{isSmall ? null : (*/}
            {/*    <Typography*/}
            {/*        sx={{*/}
            {/*            position: "absolute",*/}
            {/*            bottom: "1.5rem",*/}
            {/*            right: "2rem",*/}
            {/*            borderRadius: "50%",*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        */}
            {/*    </Typography>*/}
            {/*)}*/}
        </Card>
    );
};