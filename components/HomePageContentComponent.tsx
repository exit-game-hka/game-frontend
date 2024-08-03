"use client";
import React from "react";
import dynamic from "next/dynamic";
import {Stack, Typography} from "@mui/material";
import styled from "styled-components";
import {Box} from "@mui/joy";
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
    return (
        <SectionListContainer>
            {/*<OverviewCardComponent />*/}
            <LoginSectionContainer issmall={`${isSmall}`}>
                <Stack
                    spacing="var(--space-4)"
                    sx={{
                        maxWidth: isSmall ? "unset" : "700px",
                    }}
                >
                    <Typography level="h2">Anmeldung</Typography>
                    <Typography level="title-md">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna. At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet clita kasd gubergren.
                    </Typography>
                </Stack>
                <LoginComponent />
            </LoginSectionContainer>
        </SectionListContainer>
    );
};

const LoginSectionContainer = styled(Box)<{ issmall: "true" | "false" }>`
    display: grid;
    grid-template-columns: ${(props) => props.issmall === "true" ? "1fr" : "1fr auto"} ;
    gap: var(--space-10);
    padding: ${(props) => props.issmall === "true" ? "0" : "0 var(--space-2) 0 var(--space-2)"};
`;

const SectionListContainer = styled(Stack)`
    gap: var(--space-20);
`;

export default HomePageContentComponent;
