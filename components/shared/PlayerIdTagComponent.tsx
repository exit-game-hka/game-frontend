import React, {useState} from "react";
import Chip from "@mui/joy/Chip";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import Tooltip from "@mui/joy/Tooltip";
import Snackbar, { SnackbarOrigin } from '@mui/joy/Snackbar';
import {useMediaQuery} from "@/hooks/useMediaQuery";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type Props = {
    id: string;
    size: "sm" | "md" | "lg";
    snackbarOrigin?: SnackbarOrigin;
}
const PlayerIdTagComponent: React.FC<Props> = (props) => {
    const { id, size, snackbarOrigin } = props;
    const { isSmall } = useMediaQuery();
    const [showSnackBar, setShowSnackBar] = useState<boolean>(false);

    const handleClick = async (e: any) => {
        e?.stopPropagation();
        await window.navigator.clipboard.writeText(id);
        setShowSnackBar(true);
    }

    return (
        <>
            <Tooltip
                variant="outlined"
                title="Zum Kopieren anklicken"
                size="lg"
                arrow
                placement="bottom"
                sx={{
                    borderColor: "var(--color-primary)",
                }}
            >
                <Chip
                    size={size}
                    variant="outlined"
                    color="primary"
                    onClick={handleClick}
                    startDecorator={<VpnKeyOutlinedIcon onClick={handleClick} />}
                    sx={{
                        borderRadius: "md",
                    }}
                >
                    Spieler ID: <span style={{ fontWeight: "bold" }}>{id}</span>
                </Chip>
            </Tooltip>
            <Snackbar
                anchorOrigin={snackbarOrigin ?? { vertical: "top", horizontal: "center" }}
                open={showSnackBar}
                variant={"outlined"}
                autoHideDuration={5000}
                onClose={() => setShowSnackBar(false)}
                sx={{
                    width: isSmall ? "95%" : "500px",
                }}
            >
               <InfoOutlinedIcon /> Deine Spieler ID wurde in die Zwischenablage kopiert! <span style={{ fontSize: "var(--font-medium)" }}>👌🏽🥳</span>
            </Snackbar>
        </>
    )
}

export default PlayerIdTagComponent;