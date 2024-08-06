"use client";
import React, {useEffect} from "react";
import dynamic from "next/dynamic";
import {Stack} from "@mui/material";
import styled from "styled-components";
import {Box, Typography} from "@mui/joy";
import {useMediaQuery} from "@/hooks/useMediaQuery";

const OverviewCardComponent = dynamic(
    () => import("@/components/shared/OverviewCardComponent"),
    { ssr: false }
);

const LoginComponent = dynamic(
    () => import("@/components/LoginComponent"),
    { ssr: false }
);

const HomePageContentComponent: React.FC = ()  => {
    const { isSmall } = useMediaQuery();

    useEffect(() => {
        const body = document.querySelector("body");
        body.style.backgroundColor = "#64378C";

        return () => {
            body.style.backgroundColor = "var(--joy-palette-background-body)";
        };
    }, []);

    return (
        <SectionListContainer>
            {/*<OverviewCardComponent />*/}
            <LoginSectionContainer>
                <Stack
                    direction={"row"}
                    spacing="var(--space-4)"
                >
                    <div style={{ flexGrow: 1, alignSelf: "flex-start" }}>
                        <Box
                            component={"img"}
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/HKA_IWI_Wortmarke_weiss.svg`}
                            alt={"HKA IWI Wortmarke weiss"}
                            sx={{
                                height: isSmall ? "calc(95px * 0.6)" : "95px",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                    <div>
                        <Box
                            component={"img"}
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/HKA_IWI_Bildmarke_weiss.svg`}
                            alt={"HKA IWI Bildmarke weiss"}
                            sx={{
                                height: isSmall ? "calc(320px * 0.6)" : "320px",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                </Stack>
                <Stack
                    direction={isSmall ? "column" : "row"}
                    spacing="var(--space-4)"
                >
                    <Stack
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        <Typography
                            level={"h2"}
                            sx={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "var(--font-6xLarge)"
                            }}
                        >
                            Digital educational Escape Game
                        </Typography>
                        <div style={{ display: "grid" }}>
                            <Box
                                component={"img"}
                                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/Kryptographie-Schriftzug-Calibri-mit-WordArt.png`}
                                alt={"HKA IWI Bildmarke weiss"}
                                sx={{
                                    height: isSmall ? "calc(120px * 0.6)" : "120px",
                                    objectFit: "contain",
                                    ml: -1,
                                }}
                            />
                            <Typography
                                level="h3"
                                //textAlign={"right"}
                                fontWeight={"bold"}
                                sx={{
                                    color: "black"
                                }}
                            >
                                ...are you ready for codes?
                            </Typography>
                        </div>
                    </Stack>
                    <div style={{ marginTop: "50px" }}>
                        <LoginComponent/>
                    </div>
                </Stack>
            </LoginSectionContainer>
        </SectionListContainer>
    );
};

const LoginSectionContainer = styled(Box)`
    display: grid;
    gap: var(--space-5);
`;

const SectionListContainer = styled(Stack)`
    gap: var(--space-20);
`;

export default HomePageContentComponent;