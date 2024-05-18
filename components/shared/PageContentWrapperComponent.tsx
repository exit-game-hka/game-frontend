"use client";
import React, {PropsWithChildren} from "react";
import {Box, IconButton, Typography} from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useRouter} from "next/navigation";
import styled from "styled-components";

type Props = PropsWithChildren & {
    title?: string | undefined;
    subtitle?: string | undefined;
    showBackButton?: boolean;
};

export const PageContentWrapperComponent: React.FC<Props> = (props: Props) => {
    const { title, subtitle, showBackButton, children } = props;
    const router = useRouter();

    return (
        <PageWrapperContainer>
            <PageMainContent component="main">
                {title ?
                    <PageTitleAndBackButtonContainer>
                        {showBackButton ? (
                            <IconWrapper size="lg" onClick={router.back}>
                                <BackIcon sx={{ color: "inherit" }} />
                            </IconWrapper>
                        ) : null}
                        <TitleAndSubtitleContainer>
                            <Typography level={"h1"}>{title}</Typography>
                            {subtitle ? <Typography level={"body-sm"}>{subtitle}</Typography> : null}
                        </TitleAndSubtitleContainer>
                    </PageTitleAndBackButtonContainer> : null}
                <Box component="div">
                    {children}
                </Box>
            </PageMainContent>
        </PageWrapperContainer>
    );
};

const PageWrapperContainer = styled(Box)`
    display: grid;
    gap: var(--space-10);
    grid-template-rows: max-content 1fr;
    justify-self: center;
    padding: var(--space-1) var(--space-3);
    margin-top: var(--app-bar-height);
`;
const PageMainContent = styled(Box)`
    display: grid;
    gap: var(--space-9);
    grid-template-rows: max-content 1fr;
    max-width: var(--max-page-width);
    width: 100%;
    justify-self: center;
    margin-top: var(--space-8);
`;
const PageTitleAndBackButtonContainer = styled(Box)`
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: var(--space-4);
    align-self: start;
    align-items: center;
    align-content: center;
    position: sticky;
`;
const TitleAndSubtitleContainer = styled(Box)`
    display: grid;
    gap: var(--space-1);
`;
const IconWrapper = styled(IconButton)`
    border: 2px solid var(--color-primary);
    border-radius: 50%;
`;
const BackIcon = styled(ArrowBackIcon)`
    color: var(--color-primary);
`;

