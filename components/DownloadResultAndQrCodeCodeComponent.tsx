"use client";
import React from 'react';
import Stack from "@mui/joy/Stack";
import {Box, Card, Typography, useColorScheme} from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Image from "next/image";
import Link from "next/link";
import {useGlobalStore} from "@/store/useGlobalStore";

export const DownloadResultAndQrCodeCodeComponent: React.FC = () => {
    const removeSpieler = useGlobalStore((state) => state.removeSpieler);
    const { mode } = useColorScheme();
    const closeTab = () => {
        removeSpieler();
        // window.open('', '_self').close();
        window.close();
    }
    return (
        <Stack spacing={10}>
            <Box
                component="div"
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                    gridGap: "var(--space-8)",
                }}
            >
                <Link href={`/lerninhalte.pdf`} target={"_blank"}>
                    <Card
                        sx={{
                            display: "grid",
                            alignItems: "center",
                            alignContent: "center",
                            justifyItems: "center",
                            justifyContent: "center",
                            minHeight: "350px",
                            borderRadius: "var(--space-3)",
                            "&:hover": {
                                cursor: "pointer",
                                border: "2px solid var(--color-primary)",
                            },
                        }}
                    >
                        <Stack
                            spacing={"var(--space-4)"}
                            alignItems={"center"}
                            alignContent={"center"}
                            justifyItems={"center"}
                            justifyContent={"center"}
                        >
                            <FileDownloadOutlinedIcon sx={{ fontSize: "150px" }} />
                            <Typography level="body-sm" sx={{ fontSize: "20px" }}>
                                Lerninhalte herunterladen
                            </Typography>
                        </Stack>
                    </Card>
                </Link>
                <Link href={"https://www.ph-karlsruhe.de/personen/detail/Melissa_Gruber_8231"} target="_blank">
                    <Card
                        sx={{
                            display: "grid",
                            alignItems: "center",
                            alignContent: "center",
                            justifyItems: "center",
                            justifyContent: "center",
                            minHeight: "350px",
                            borderRadius: "var(--space-3)",
                            "&:hover": {
                                cursor: "pointer",
                                border: "2px solid var(--color-primary)",
                            },
                        }}
                    >
                        <Stack
                            spacing={"var(--space-4)"}
                            alignItems={"center"}
                            alignContent={"center"}
                            justifyItems={"center"}
                            justifyContent={"center"}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/qrcode-new.png`}
                                alt={"Qr code"}
                                width={160}
                                height={160}
                                objectFit={"cover"}
                                style={{
                                    borderRadius: "var(--space-3)",
                                    border: `2px solid ${mode === "light" ? "black" : "white" }`,
                                    cursor: "pointer",
                                    transition: "border 0.3s ease",
                                    padding: 5
                                }}
                            />
                            <Typography component="div" level="body-sm" sx={{ fontSize: "20px" }}>
                                Kontakt
                            </Typography>
                        </Stack>
                    </Card>
                </Link>
            </Box>
            <Box component="div" sx={{ alignSelf: "center" }}>
                {/*<Button variant="solid" onClick={closeTab}>*/}
                {/*    Spiel verlassen*/}
                {/*</Button>*/}
            </Box>
        </Stack>
    );
};

