import React, {useState} from "react";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {WORLD_COORDINATE} from "@/app/contants";
import {SimpleSafeBox} from "@/components/SimpleSafeBox";
import {Html} from "@react-three/drei";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";
import {AnswerInputModalComponent} from "@/components/shared/AnswerInputModalComponent";
import {useParams, useRouter} from "next/navigation";
import Stack from "@mui/joy/Stack";
import Image from "next/image";
import {Typography} from "@mui/joy";
import {StatusDto} from "@/api/status";

export const SimpleSafeBoxComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const router = useRouter();
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);
    const createStatus = useGlobalStore((state) => state.createStatus);

    const aufgabe = raum.aufgaben[0];

    const successMessage = (
      <Stack spacing={"var(--space-5)"} sx={{ mb: "var(--space-4)" }}>
          <Typography>{aufgabe.erfolgMeldung}</Typography>
          <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}/passbild_alan_turing.jpg`}
              width={250}
              height={250}
              objectFit={"cover"}
              alt={"Alan Turing"}
              style={{
                  alignSelf: "center",
                  filter: "drop-shadow(1px 5px 6px rgba(0.05833333358168602,0.05833333358168602,0.05833333358168602,0.550000011920929))",
                  borderRadius: "var(--space-3)",
              }}
          />
      </Stack>
    );

    const handleClickSafeBox = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Tresor angeklickt",
        };
        await createInteraktion(id as string, interactionDto);
    };

    const handleSuccess = async () => {
        const player = getSpielerFromLocalStorage();
        if (!player) return;

        const statusToSubmit: StatusDto = {
            spielerId: player.id,
            semesterId: player.semesterId,
            veranstaltungId: player.veranstaltungId,
            spielStart: null,
            spielEnde: null,
            istSpielBeendet: true,
            istSpielAbgebrochen: false,
        };
        await createStatus(statusToSubmit);
        window.localStorage.setItem("pwd", JSON.stringify(""));
        router.push("/outro");
    }

    return (
        <>
            <SimpleSafeBox
                // @ts-ignore
                scale={0.5}
                position={[2, WORLD_COORDINATE[1], -8]}
                onClick={handleClickSafeBox}
            />
            <Html>
                <AnswerInputModalComponent
                    open={isOpen}
                    title="Wie läutet das Lösungswort ?"
                    submitButtonLabel="weiter"
                    aufgabeId={aufgabe.id}
                    answer={aufgabe.loesungen[0].wert}
                    successMessage={successMessage}
                    timeoutOnSuccess={5000}
                    failureMessage={aufgabe.fehlschlagMeldung}
                    onSuccess={handleSuccess}
                    onClose={() => setIsOpen(false)}
                    modalDialogProps={{
                        maxWidth: "550px",
                        minWidth: "550px",
                    }}
                />
            </Html>
        </>
    );
};
