import React from 'react';
import Stack from "@mui/joy/Stack";
import {Card, Box, Typography} from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Image from "next/image";
import Link from "next/link";

export const DownloadResultAndQrCodeCodeComponent: React.FC = () => {
    return (
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
                        <FileDownloadOutlinedIcon sx={{ fontSize: "100px" }} />
                        <Typography level="body-sm" sx={{ fontSize: "20px" }}>
                            Lerninhalte herunterladen
                        </Typography>
                    </Stack>
                </Card>
            </Link>
            <Card
                sx={{
                    display: "grid",
                    alignItems: "center",
                    alignContent: "center",
                    justifyItems: "center",
                    justifyContent: "center",
                    minHeight: "350px",
                    borderRadius: "var(--space-3)",
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
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/qrcode.png`}
                        alt={"Qr code"}
                        width={200}
                        height={200}
                        objectFit={"cover"}
                    />
                    <Typography component="div" level="body-sm" sx={{ fontSize: "20px" }}>
                        Scannen Sie den QR-Code für Fragen
                    </Typography>
                </Stack>
            </Card>
        </Box>
    );
};

